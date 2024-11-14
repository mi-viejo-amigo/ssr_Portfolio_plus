import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { nanoid, createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as useDispatch$1, useSelector as useSelector$1, Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Suspense, useState, useEffect, useRef, lazy, StrictMode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy, faWindowMinimize, faExpand } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faInstagram, faGithub, faVk } from "@fortawesome/free-brands-svg-icons";
import ReactDOM from "react-dom";
import clsx from "clsx";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
const initialState = {
  tasks: [
    {
      id: nanoid(),
      text: "Убить Билла",
      fixedTickPath: null,
      fixedCrossPathA: null,
      fixedCrossPathB: null,
      checkBoxfixedColor: "#646cffaa",
      fixedBackground: "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
      isFixed: false
    },
    {
      id: nanoid(),
      text: "Покормить собаку",
      fixedTickPath: null,
      fixedCrossPathA: null,
      fixedCrossPathB: null,
      checkBoxfixedColor: "#646cffaa",
      fixedBackground: "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
      isFixed: false
    },
    {
      id: nanoid(),
      text: "8 раз обнять Полинку <3",
      fixedTickPath: null,
      fixedCrossPathA: null,
      fixedCrossPathB: null,
      checkBoxfixedColor: "#646cffaa",
      fixedBackground: "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
      isFixed: false
    }
  ]
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        text: action.payload.text,
        fixedTickPath: null,
        fixedCrossPathA: null,
        fixedCrossPathB: null,
        checkBoxfixedColor: "#646cffaa",
        fixedBackground: "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
        isFixed: false
      });
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    chengeFixedCheckBoxColor: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.checkBoxfixedColor = action.payload.color;
        }
        return task;
      });
    },
    chengeBackgroundColor: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.fixedBackground = action.payload.color;
        }
        return task;
      });
    },
    updateFixedPaths: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.fixedTickPath = action.payload.tickPath;
          task.fixedCrossPathA = action.payload.crossPathA;
          task.fixedCrossPathB = action.payload.crossPathB;
          task.isFixed = action.payload.isFixed;
        }
        return task;
      });
    }
  }
  // selectors: {
  //   getTaskById: (state) => ( id: string): Task | string => {
  //     return state.tasks.find((task) => task.id === id) || 'task not found';
  //   },
  // },
});
const { addTask, deleteTask, chengeFixedCheckBoxColor, reorderTasks, chengeBackgroundColor, updateFixedPaths } = taskSlice.actions;
const rootReducer = combineReducers({
  tasks: taskSlice.reducer
});
const store = configureStore({
  reducer: rootReducer
  // devTools: process.env.NODE_ENV !== 'production'
});
const useDispatch = useDispatch$1.withTypes();
const useSelector = useSelector$1.withTypes();
const loaderCenter = "_loaderCenter_1hqlz_1";
const styles$4 = {
  loaderCenter
};
const WithLoader = ({ children }) => {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: styles$4.loaderCenter, children: /* @__PURE__ */ jsx(ClipLoader, { color: "#36d7b7", size: 100 }) }), children });
};
const Tab = ({ title: title2, isActive, borderRadius, handleTabClick }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: `tab ${isActive ? "tab_active" : ""}`,
      onClick: handleTabClick,
      style: { borderRadius },
      children: [
        /* @__PURE__ */ jsx("p", { children: title2 }),
        isActive ? /* @__PURE__ */ jsx(motion.div, { className: "underline", layoutId: "underline" }) : null
      ]
    }
  ) });
};
const Button = function({ onClick, children, size = 15, className }) {
  return /* @__PURE__ */ jsx("button", { style: { padding: `${size}px` }, className, onClick, children });
};
const TextArea = () => {
  const [open, setOpen] = useState(true);
  const [isWrapped, setIsWrapped] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleWrapperClick = () => {
    setIsWrapped((prev) => !prev);
  };
  const [{ days, hours, minutes, seconds }, setTime] = useState({ days: 2, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const endDate = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 2);
    const updateCountdown = () => {
      const now = /* @__PURE__ */ new Date();
      const timeDifference = +endDate - +now;
      if (timeDifference <= 0) {
        clearInterval(countDownTimer);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(timeDifference / (1e3 * 60 * 60 * 24)),
        hours: Math.floor(timeDifference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
        minutes: Math.floor(timeDifference % (1e3 * 60 * 60) / (1e3 * 60)),
        seconds: Math.floor(timeDifference % (1e3 * 60) / 1e3)
      });
    };
    const countDownTimer = setInterval(updateCountdown, 1e3);
    updateCountdown();
    return () => clearInterval(countDownTimer);
  }, []);
  return /* @__PURE__ */ jsx(LayoutGroup, { children: open && /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "text-area_wrapper",
      layout: true,
      children: /* @__PURE__ */ jsx(
        motion.article,
        {
          className: `text-area_window${isWrapped ? "-preview" : ""}`,
          layout: true,
          initial: false,
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.3 } },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          children: !isWrapped ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("header", { className: "text-area_header", children: [
              /* @__PURE__ */ jsx(Button, { className: "text-area_button text-area_button_extended", onClick: handleClose, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faTimes }) }),
              /* @__PURE__ */ jsx(Button, { className: "text-area_button", onClick: () => {
              }, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCopy }) }),
              /* @__PURE__ */ jsx(Button, { className: "text-area_button", onClick: handleWrapperClick, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faWindowMinimize }) }),
              /* @__PURE__ */ jsx("p", { style: { marginLeft: "auto" }, children: "C:\\ Text_area.txt" })
            ] }),
            /* @__PURE__ */ jsx("main", { className: "text-area_main", children: /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "Введите текст",
                rows: 17,
                cols: 65,
                className: "text-area_input"
              }
            ) }),
            /* @__PURE__ */ jsxs("footer", { className: "text-area_footer", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                "Обратный отсчет: ",
                days,
                " дн. ",
                hours,
                " ч. ",
                minutes,
                " мин. ",
                seconds,
                " сек."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                (/* @__PURE__ */ new Date()).getFullYear(),
                " © Все права защищены"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsx(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.3, delay: 0.4 } },
              children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-area_button text-area_button_wrapped-icon",
                  onClick: handleWrapperClick,
                  children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faExpand })
                }
              )
            }
          )
        }
      )
    }
  ) });
};
const modal = "_modal_7rmdv_1";
const overlay = "_overlay_7rmdv_23";
const popup = "_popup_7rmdv_41";
const button$2 = "_button_7rmdv_75";
const styles$3 = {
  modal,
  overlay,
  popup,
  button: button$2
};
const Modal = function({ closeModal, children }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const modalRoot = document.getElementById("modals");
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: styles$3.modal,
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsx("div", { className: styles$3.overlay, onClick: closeModal }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: styles$3.popup,
              initial: { scale: 0.5 },
              animate: { scale: 1 },
              exit: { scale: 0.5 },
              transition: { duration: 0.3 },
              children: [
                children,
                /* @__PURE__ */ jsx("button", { className: styles$3.button, onClick: closeModal, children: "Close" })
              ]
            }
          )
        ]
      }
    ),
    modalRoot
  );
};
const sotials = [
  { name: "Telegram", icon: faTelegram },
  { name: "Instagram", icon: faInstagram },
  { name: "Github", icon: faGithub },
  { name: "VK", icon: faVk }
];
const WelcomePage = ({ changeTab }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    changeTab(null);
  }, [changeTab]);
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleNavigation = (path) => {
    changeTab(path);
    navigate(`/${path}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "welcomeWrapper", children: [
    /* @__PURE__ */ jsxs("header", { className: "header", children: [
      /* @__PURE__ */ jsx("h1", { children: "Добро пожаловать в мой проект!" }),
      /* @__PURE__ */ jsx("p", { children: "Я, Frolov Nikita, Frontend Developer, представляю демо-страницу для тестирования различных вкладок и функций." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "profileSection", children: [
      /* @__PURE__ */ jsxs("div", { className: "profileSotials", children: [
        /* @__PURE__ */ jsx("h2", { className: "profileSotialsTitle", children: "Мои социальные сети:" }),
        /* @__PURE__ */ jsx("div", { className: "profileSotialsIconWrapper", children: sotials.map(
          (sotial) => /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("div", { className: "sotialIcon", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: sotial.icon }) }) }, sotial.name)
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "profileCard", children: [
        /* @__PURE__ */ jsx("img", { src: "src\\assets\\nikita_foto.jpg", alt: "autor foto", className: "profileImage", onClick: openModal }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsx(Modal, { closeModal, children: /* @__PURE__ */ jsx("img", { src: "src\\assets\\nikita_foto.jpg", alt: "autor foto", className: "profileImageModal" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "profileInfo", children: [
          /* @__PURE__ */ jsx("h2", { children: "Frolov Nikita" }),
          /* @__PURE__ */ jsx("p", { children: "Frontend Developer | React Enthusiast" }),
          /* @__PURE__ */ jsx("p", { className: "description", children: "Исследуйте мои разработки и посмотрите, что я создал. Каждая вкладка демонстрирует уникальный функционал." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "tabsSection", children: [
      /* @__PURE__ */ jsx("h2", { children: "Попробуйте мои вкладки:" }),
      /* @__PURE__ */ jsx("div", { className: "tabCards", children: [
        { title: "Tasks", description: "Drag-and-drop менеджер задач.", path: "tasks" },
        { title: "Text Area", description: "Редактор текста для заметок.", path: "textarea" },
        { title: "Chat Page", description: "Чат с WebSocket для обмена сообщениями.", path: "chatpage" },
        { title: "Galery", description: "Галерея изображений в высоком разрешении.", path: "galery" }
      ].map((tab) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "tabCard",
          onClick: () => handleNavigation(tab.path),
          children: [
            /* @__PURE__ */ jsx("h3", { children: tab.title }),
            /* @__PURE__ */ jsx("p", { children: tab.description })
          ]
        },
        tab.path
      )) })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
      /* @__PURE__ */ jsx("h3", { children: "Документация:" }),
      /* @__PURE__ */ jsx("p", { children: "Каждая вкладка реализует уникальную логику с использованием React, Router и других библиотек, таких как Redux и WebSocket." }),
      /* @__PURE__ */ jsx("p", { children: "Проект создан для демонстрации моих навыков во фронтенд-разработке и современных технологий." })
    ] })
  ] });
};
const wrapper$1 = "_wrapper_1jwb7_1";
const container = "_container_1jwb7_23";
const form$1 = "_form_1jwb7_49";
const title$1 = "_title_1jwb7_69";
const input$1 = "_input_1jwb7_83";
const button$1 = "_button_1jwb7_123";
const styles$2 = {
  wrapper: wrapper$1,
  container,
  form: form$1,
  title: title$1,
  input: input$1,
  button: button$1
};
const JoinChatPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", room: "" });
  const handleInput = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const hendleSubmit = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);
    if (isDisabled) return;
    e.preventDefault();
    navigate(`/chatroom?name=${values.name}&room=${values.room}`);
  };
  return /* @__PURE__ */ jsx("div", { className: styles$2.wrapper, children: /* @__PURE__ */ jsxs("div", { className: styles$2.container, children: [
    /* @__PURE__ */ jsx("h2", { className: styles$2.title, children: "Join" }),
    /* @__PURE__ */ jsxs("form", { className: styles$2.form, onSubmit: hendleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "name",
          className: styles$2.input,
          type: "text",
          placeholder: "name",
          onChange: handleInput,
          value: values.name,
          autoComplete: "off",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "room",
          className: styles$2.input,
          type: "text",
          placeholder: "room",
          onChange: handleInput,
          value: values.room,
          autoComplete: "off",
          required: true
        }
      ),
      /* @__PURE__ */ jsx("button", { className: styles$2.button, type: "submit", children: "sing in" })
    ] })
  ] }) });
};
const wrapper = "_wrapper_1n4r7_3";
const header = "_header_1n4r7_73";
const title = "_title_1n4r7_99";
const roomName = "_roomName_1n4r7_115";
const users = "_users_1n4r7_123";
const main = "_main_1n4r7_139";
const form = "_form_1n4r7_165";
const input = "_input_1n4r7_189";
const button = "_button_1n4r7_259";
const emoji = "_emoji_1n4r7_307";
const emojiIcon = "_emojiIcon_1n4r7_323";
const emojiList = "_emojiList_1n4r7_349";
const styles$1 = {
  wrapper,
  header,
  title,
  roomName,
  users,
  main,
  form,
  input,
  button,
  emoji,
  emojiIcon,
  emojiList
};
const messages = "_messages_11tme_25";
const message = "_message_11tme_25";
const messageUser = "_messageUser_11tme_65";
const messageTextContainer = "_messageTextContainer_11tme_83";
const messageText = "_messageText_11tme_83";
const myMessage = "_myMessage_11tme_119";
const otrerMessage = "_otrerMessage_11tme_139";
const styles = {
  messages,
  message,
  messageUser,
  messageTextContainer,
  messageText,
  myMessage,
  otrerMessage
};
const Messages = ({ messages: messages2, name }) => {
  return /* @__PURE__ */ jsx("div", { className: styles.messages, children: messages2.map((message2, index) => {
    const isMe = message2.user.name.trim().toLowerCase() === name.toLowerCase();
    const messageClass = isMe ? styles.myMessage : styles.otrerMessage;
    const inHover = {
      scale: 1.05,
      background: isMe ? "linear-gradient(145deg, #2a2f3b, #333946)" : "linear-gradient(145deg, #404652, #2f343d)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)"
    };
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: clsx(styles.message, messageClass),
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 25 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsx("div", { className: styles.messageUser, children: message2.user.name }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: styles.messageTextContainer,
              whileHover: inHover,
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsx("div", { className: styles.messageText, children: message2.message })
            }
          )
        ]
      },
      index
    );
  }) });
};
const icon = "data:image/png;base64,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";
const socket = io("http://localhost:5173");
const ChatRoom = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: "", name: "" });
  const [messages2, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [users2, setUsers] = useState(0);
  const emojiRef = useRef(null);
  const mainRef = useRef(null);
  const navigate = useNavigate();
  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };
  const emojiClick = ({ emoji: emoji2 }) => {
    setUserMessage(`${userMessage} ${emoji2}`);
    setEmojiOpen(false);
  };
  const openEmoji = (e) => {
    e.stopPropagation();
    setEmojiOpen(true);
  };
  const closeEmoji = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setEmojiOpen(false);
    }
  };
  const leaveRoom = () => {
    socket.emit("leaveRoom", params);
    navigate("/chatpage");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userMessage) return;
    socket.emit("sendMessage", { userMessage, params });
    setUserMessage("");
  };
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);
  useEffect(() => {
    const handleMessage = ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    const hendleRoomData = ({ data: { users: users22 } }) => {
      setUsers(users22.length);
    };
    socket.on("message", handleMessage);
    socket.on("roomData", hendleRoomData);
    return () => {
      socket.off("message", handleMessage);
      socket.off("roomData", hendleRoomData);
    };
  }, []);
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [messages2]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: styles$1.wrapper, onClick: closeEmoji, children: [
    /* @__PURE__ */ jsxs("header", { className: styles$1.header, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.title, children: [
          "Room: ",
          /* @__PURE__ */ jsx("strong", { className: styles$1.roomName, children: params == null ? void 0 : params.room })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.users, children: [
          users2,
          " users in this room"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: styles$1.button, onClick: leaveRoom, children: "Logout" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: styles$1.main, ref: mainRef, children: /* @__PURE__ */ jsx(Messages, { messages: messages2, name: params.name }) }),
    /* @__PURE__ */ jsxs("form", { className: styles$1.form, onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "message",
          className: styles$1.input,
          type: "text",
          placeholder: "your message...",
          onChange: handleUserMessage,
          value: userMessage,
          autoComplete: "off",
          required: true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: styles$1.emoji, onClick: openEmoji, children: /* @__PURE__ */ jsx("img", { src: icon, alt: "emoji icon", className: styles$1.emojiIcon }) }),
      emojiOpen && /* @__PURE__ */ jsx("div", { className: styles$1.emojiList, ref: emojiRef, children: /* @__PURE__ */ jsx(
        EmojiPicker,
        {
          onEmojiClick: emojiClick,
          lazyLoadEmojis: true,
          open: emojiOpen,
          theme: "dark"
        }
      ) }),
      /* @__PURE__ */ jsx("button", { className: styles$1.button, type: "submit", children: "Send" })
    ] })
  ] }) });
};
const TaskCreator = lazy(() => import("./assets/TaskCreator-D5S2l0re.js"));
const Galery = lazy(() => import("./assets/Galery-BzXcV3Qz.js"));
function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const handleTabClick = (tab) => {
    setDirection(activeTab ? tabsOrder[tab] > tabsOrder[activeTab] ? 1 : -1 : 1);
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };
  useEffect(() => {
    if (!activeTab && location.pathname !== "/") {
      navigate("/");
    }
  }, [location, activeTab, navigate]);
  const tabsOrder = {
    "tasks": 0,
    "textarea": 1,
    "chatpage": 2,
    "galery": 4
  };
  const variants = {
    enter: (direction2) => ({
      x: direction2 > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction2) => ({
      x: direction2 < 0 ? 300 : -300,
      opacity: 0
    })
  };
  const tabAnimationSettings = {
    custom: direction,
    variants,
    initial: "enter",
    animate: "center",
    exit: "exit",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "tabs-wrapper", children: [
      /* @__PURE__ */ jsx(Tab, { title: "Tasks", isActive: activeTab === "tasks", handleTabClick: () => handleTabClick("tasks"), borderRadius: "10px 0 0 10px" }),
      /* @__PURE__ */ jsx(Tab, { title: "TextArea", isActive: activeTab === "textarea", handleTabClick: () => handleTabClick("textarea"), borderRadius: "0 0 0 0" }),
      /* @__PURE__ */ jsx(Tab, { title: "Chat", isActive: activeTab === "chatpage", handleTabClick: () => handleTabClick("chatpage"), borderRadius: "0 0 0 0" }),
      /* @__PURE__ */ jsx(Tab, { title: "Galery", isActive: activeTab === "galery", handleTabClick: () => handleTabClick("galery"), borderRadius: "0 10px 10px 0" })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { custom: direction, mode: "wait", children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(WelcomePage, { changeTab: setActiveTab }) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/tasks",
          element: activeTab === "tasks" ? /* @__PURE__ */ jsx(motion.div, { ...tabAnimationSettings, className: "card", children: /* @__PURE__ */ jsx(DndProvider, { backend: HTML5Backend, children: /* @__PURE__ */ jsx(WithLoader, { children: /* @__PURE__ */ jsx(TaskCreator, {}) }) }) }, "tasks") : null
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/textarea",
          element: activeTab === "textarea" ? /* @__PURE__ */ jsx(motion.div, { ...tabAnimationSettings, children: /* @__PURE__ */ jsx(TextArea, {}) }, "textarea") : null
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/chatpage",
          element: activeTab === "chatpage" ? /* @__PURE__ */ jsx(motion.div, { className: "chatPage", ...tabAnimationSettings, children: /* @__PURE__ */ jsx(JoinChatPage, {}) }, "chatpage") : null
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/galery",
          element: activeTab === "galery" ? /* @__PURE__ */ jsx(motion.div, { ...tabAnimationSettings, children: /* @__PURE__ */ jsx(WithLoader, { children: /* @__PURE__ */ jsx(Galery, {}) }) }, "Galery") : null
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/chatroom", element: /* @__PURE__ */ jsx(ChatRoom, {}) })
    ] }) })
  ] });
}
function render(url) {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
  return { html };
}
export {
  Button as B,
  useSelector as a,
  updateFixedPaths as b,
  chengeFixedCheckBoxColor as c,
  chengeBackgroundColor as d,
  addTask as e,
  deleteTask as f,
  reorderTasks as r,
  render,
  useDispatch as u
};
