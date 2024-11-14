import { trimString } from "./utils.js";

let users = [];

export const findUser = (user) => {
    if (!user.name || !user.room) {
        console.log("Ошибка: user.name или room не переданы.");
        return { error: "User name and room are required." };
    }

    const userName = trimString(user.name);
    const userRoom = trimString(user.room);

    // Проверка на существование пользователя
    const isExist = users.find(
        (u) => trimString(u.name) === userName && trimString(u.room) === userRoom
    );
    return isExist;
}

export const addUser = (user) => {
    // Проверка обязательных полей
    const isExist = findUser(user);

    if (isExist) {
        // Возвращаем существующего пользователя и статус isExist: true
        return { isExist: true, user: isExist };
    }

    // Добавляем нового пользователя
    const newUser = { name: user.name, room: user.room };
    users.push(newUser);

    // Возвращаем добавленного пользователя и статус isExist: false
    return { isExist: false, user: newUser };
};

export const removeUser = (user) => {
    const found = findUser(user);
    if (found) {
        users = users.filter(
            ({name, room}) => room === found.room && name !== found.name
        );
    }
    return found;
}

export const getRoomUsers = (room) => {
    if (!room) {
        console.log("Ошибка: room не передан.");
        return { error: "Room is required." };
    }
    return users.filter((u) => u.room === room)
}