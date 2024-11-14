import fs from 'node:fs/promises';
import express from 'express';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';
import http from 'http';
import route from './route.js';
import { addUser, findUser, getRoomUsers, removeUser } from './users.js';

// Константы
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Создание HTTP-сервера и Socket.IO
const app = express();
const server = http.createServer(app);
const io = new IOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Включаем CORS и добавляем маршруты
app.use(cors({ origin: '*' }));
app.use('/api', route);

// Шаблон HTML
const templateHtml = isProduction
    ? await fs.readFile('../dist/client/index.html', 'utf-8')  // Обновлен путь для prod
    : '';

// Поддержка SSR с Vite
let vite;

if (!isProduction) {
    const { createServer } = await import('vite');

    // Создаем сервер Vite в режиме мидлвары
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        root: '../client',  // Указываем корневую папку клиента
        base
    });

    app.use(vite.middlewares);

} else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;

    // Подключаем мидлвару для сжатия размеров ответов
    app.use(compression());

    // Раздаем статику
    app.use(base, sirv('../dist/client', { extensions: [] }));  // Обновлен путь
}

app.use('*', async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, '');

        let template;
        let render;

        if (!isProduction) {
            // Читаем шаблон для каждого рендера в dev-режиме
            template = await fs.readFile('../client/index.html', 'utf-8');  // Обновлен путь

            // Применяем HTML-преобразования Vite
            template = await vite.transformIndexHtml(url, template);

            // Загружаем серверную точку входа
            render = (await vite.ssrLoadModule('../client/src/entry-server.tsx')).render;

        } else {
            // Используем ранее прочитанный шаблон
            template = templateHtml;

            // Загружаем функцию render из билда
            render = (await import('../dist/server/entry-server.js')).render;  
        }

        // Запускаем метод рендера HTML
        const rendered = await render(url);

        // Вставляем отрендеренный HTML в шаблон
        const html = template.replace(`<!--ssr-outlet-->`, rendered.html ?? '');

        // Возвращаем всю разметку
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html);

    } catch (e) {
        vite?.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
    }
});

// Настройка WebSocket с Socket.IO
io.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);
    socket.on('join', ({ name, room }) => {
        socket.join(room);

        const { isExist, user } = addUser({ name, room })
        const adminMessage = isExist ? 'Here you go again!' : `Hello ${name} welcome to room named ${room}`;
        
        socket.emit("message", {
          data: {
            user: {name: 'admin'},
            message: adminMessage
          }
        });
        
        socket.broadcast.to(user.room).emit("message", {
          data: {
            user: {name: 'admin'},
            message: `User ${name} joined room ${room}`
          }
        });

        io.to(user.room).emit("roomData", {
          data: {
            users: getRoomUsers(user.room)
          }
        });
    });

    socket.on('sendMessage', ({ userMessage, params }) => {
      const user = findUser(params);

      if (user) {
        io.to(user.room).emit("message", {
          data: {
            user: user,
            message: userMessage
          }
        });
      }
    });

    socket.on('leaveRoom', ({ name, room }) => {
        const user = removeUser({ name, room });
        if (user) {
            const { name, room } = user;
            io.to(room).emit("message", {
              data: {
                user: {name: 'admin'},
                message: `User ${name} has left the room..`
              }
            });

            io.to(room).emit("roomData", {
              data: {
                users: getRoomUsers(room)
              }
            });
        }
    });
});

// Запускаем сервер
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});