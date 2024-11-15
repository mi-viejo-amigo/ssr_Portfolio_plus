import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from "react";
import { useTransform, motion, useDragControls, useMotionValue, Reorder, LayoutGroup, AnimatePresence } from "framer-motion";
import { u as useDispatch, a as useSelector, c as chengeFixedCheckBoxColor, b as updateFixedPaths, B as Button, d as chengeBackgroundColor, r as reorderTasks, e as addTask, f as deleteTask } from "../entry-server.js";
import "react-dom/server";
import "@reduxjs/toolkit";
import "react-redux";
import "react-router-dom/server.mjs";
import "react-dnd";
import "react-dnd-html5-backend";
import "react-router-dom";
import "react-spinners/ClipLoader.js";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "react-dom";
import "clsx";
import "emoji-picker-react";
import "socket.io-client";
function ReorderIcon({ dragControls }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 39 39",
      width: "39",
      height: "39",
      className: "task-creator__drag-icon",
      onPointerDown: (event) => dragControls.start(event),
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z",
            fill: "#646cffaa"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z",
            fill: "#646cffaa"
          }
        )
      ]
    }
  );
}
const CheckBox = ({ x, xInput, taskId, onFixBackground }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.tasks.find((task2) => task2.id === taskId));
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "#646cffaa",
    "rgb(3, 209, 0)"
  ]);
  const dynamicTickPath = useTransform(x, [5, 20], [0, 1]);
  const dynamicCrossPathA = useTransform(x, [-5, -20], [0, 1]);
  const dynamicCrossPathB = useTransform(x, [-5, -30], [0, 1]);
  const tickPath = (task == null ? void 0 : task.isFixed) ? task.fixedTickPath ?? 0 : dynamicTickPath;
  const crossPathA = (task == null ? void 0 : task.isFixed) ? task.fixedCrossPathA ?? 0 : dynamicCrossPathA;
  const crossPathB = (task == null ? void 0 : task.isFixed) ? task.fixedCrossPathB ?? 0 : dynamicCrossPathB;
  const handleDragEnd = () => {
    if (x.get() >= 40 || x.get() <= -40) {
      dispatch(chengeFixedCheckBoxColor({ id: taskId, color: color.get() }));
      onFixBackground(false);
      if (x.get() >= 40) {
        dispatch(updateFixedPaths({
          id: taskId,
          tickPath: 1,
          crossPathA: 0,
          crossPathB: 0,
          isFixed: true
        }));
      } else if (x.get() <= -40) {
        dispatch(updateFixedPaths({
          id: taskId,
          tickPath: 0,
          crossPathA: 1,
          crossPathB: 1,
          isFixed: true
        }));
      }
    } else {
      dispatch(chengeFixedCheckBoxColor({ id: taskId, color: null }));
      dispatch(updateFixedPaths({ id: taskId, tickPath: 0, crossPathA: 0, crossPathB: 0, isFixed: false }));
      onFixBackground(true);
    }
  };
  const handleDragStart = () => {
    dispatch(updateFixedPaths({ id: taskId, tickPath: 0, crossPathA: 0, crossPathB: 0, isFixed: false }));
    onFixBackground(true);
    dispatch(chengeFixedCheckBoxColor({ id: taskId, color: null }));
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "box",
      style: { x },
      drag: "x",
      dragElastic: 0.4,
      dragConstraints: { left: 0, right: 0 },
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      children: /* @__PURE__ */ jsxs("svg", { className: "progress-icon", viewBox: "0 0 50 50", children: [
        /* @__PURE__ */ jsx(
          motion.path,
          {
            fill: "none",
            strokeWidth: "2",
            stroke: (task == null ? void 0 : task.checkBoxfixedColor) || color,
            d: "M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0",
            className: "progress-icon_path-circle"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            fill: "none",
            strokeWidth: "2",
            stroke: (task == null ? void 0 : task.checkBoxfixedColor) || color,
            d: "M14,26 L 22,33 L 35,16",
            strokeDasharray: (task == null ? void 0 : task.isFixed) && task.fixedTickPath ? "1 1" : "0 1",
            pathLength: tickPath
          }
        ),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            fill: "none",
            strokeWidth: "2",
            stroke: (task == null ? void 0 : task.checkBoxfixedColor) || color,
            d: "M17,17 L33,33",
            strokeDasharray: (task == null ? void 0 : task.isFixed) && task.fixedCrossPathA ? "1 1" : "0 1",
            pathLength: crossPathA
          }
        ),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            fill: "none",
            strokeWidth: "2",
            stroke: (task == null ? void 0 : task.checkBoxfixedColor) || color,
            d: "M33,17 L17,33",
            strokeDasharray: (task == null ? void 0 : task.isFixed) && task.fixedCrossPathB ? "1 1" : "0 1",
            pathLength: crossPathB
          }
        )
      ] })
    }
  );
};
const AnimatedTaskDnd = React.forwardRef(
  ({ task, position, handlerTaskDelete }, forwardedRef) => {
    const { fixedBackground } = task;
    const dispatch = useDispatch();
    const controls = useDragControls();
    const x = useMotionValue(0);
    const xInput = [-40, 0, 40];
    const background = useTransform(x, xInput, [
      "linear-gradient(90deg, rgb(125, 45, 62) 0%, rgb(47, 45, 62) 70%)",
      // красный
      "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
      // оригинальный цвет
      "linear-gradient(90deg, rgb(47, 105, 62) 0%, rgb(47, 45, 62) 70%)"
      // зелёный
    ]);
    const handleFixBackground = (reset) => {
      if (reset) {
        dispatch(chengeBackgroundColor({ id: task.id, color: null }));
      } else {
        dispatch(chengeBackgroundColor({ id: task.id, color: background.get() }));
      }
    };
    return /* @__PURE__ */ jsxs(
      Reorder.Item,
      {
        value: task,
        as: "li",
        dragListener: false,
        dragControls: controls,
        ref: forwardedRef,
        layout: true,
        layoutDependency: position,
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 200, opacity: 0, transition: { duration: 0.2 } },
        transition: { type: "spring", stiffness: 200, damping: 10 },
        whileDrag: { scaleX: 1.1, scaleY: 1.2, cursor: "grabbing", boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)", zIndex: 1 },
        className: "task-creator__item",
        style: { background: fixedBackground ?? background },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "task-creator__item-content-wrapper", children: [
            /* @__PURE__ */ jsx("span", { className: "task-creator__counter", children: position + 1 }),
            /* @__PURE__ */ jsx(ReorderIcon, { dragControls: controls })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "task-creator__item-text", children: task.text }),
          /* @__PURE__ */ jsx(CheckBox, { x, xInput, taskId: task.id, onFixBackground: handleFixBackground }),
          /* @__PURE__ */ jsx(Button, { className: "task-creator__delete-button", size: 20, onClick: handlerTaskDelete })
        ]
      }
    );
  }
);
const FormTask = ({ value, refForInput, setValue, handlerTaskSubmit }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    motion.form,
    {
      className: "task-creator__form",
      onSubmit: handlerTaskSubmit,
      children: [
        /* @__PURE__ */ jsx(
          motion.input,
          {
            className: "task-creator__input",
            placeholder: "Write here...",
            ref: refForInput,
            type: "text",
            value,
            onChange: (e) => setValue(e.target.value),
            whileFocus: { scale: 1.1, boxShadow: "0px 4px 10px rgba(100, 100, 255, 0.5)" },
            transition: { type: "linear", stiffness: 60, damping: 10 }
          }
        ),
        /* @__PURE__ */ jsx("button", { disabled: !value, children: "Add" })
      ]
    }
  ) });
};
const NoTaskComponent = () => {
  return /* @__PURE__ */ jsx(
    motion.h2,
    {
      initial: { opacity: 0, scale: 0.5, y: 50 },
      animate: { opacity: 1.5, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.5, y: 50 },
      transition: { duration: 0.3 },
      children: "No tasks yet"
    }
  );
};
const svg = "_svg_1alte_1";
const styles = {
  svg
};
const ComponentSVG = ({ width = 800, height = 200, rotate = 0, fill = { first: "#646cffaa", second: "#61dafbaa", third: "#ff7f7faa" } }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width,
          height,
          version: "1.0",
          viewBox: "0 0 1920 1080",
          preserveAspectRatio: "none",
          className: styles.svg,
          style: { transform: `rotateX(${rotate}deg)` },
          children: [
            /* @__PURE__ */ jsx(
              motion.path,
              {
                animate: { fill: [fill.first, fill.second, fill.third] },
                whileHover: { fill: fill.first },
                transition: {
                  duration: 3,
                  ease: "linear",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                },
                d: "M965.6 254.5c-2 19.8-13.6 44.6-32.3 69.2l-5.5 7.1 5.7 8.3a168 168 0 0 1 24.4 56.2c3.3 15.3 4.1 33.2 4.1 96.2 0 60-.8 80.6-3.6 94.3a162.2 162.2 0 0 1-31.5 67.9l-4.8 6.2 7.5 6.7c11 9.9 23 27.8 30.9 46.3l3.6 8.5-9.8 9.8-9.8 9.9 11.2 11.1 11.3 11.1 5.7-5.3c14.4-13.4 17.3-16.2 17.3-16.9 0-.4-4.3-4.9-9.5-10.1l-9.6-9.3 2.1-6.1c4.2-12.6 15.5-29.7 31.8-48.1l8-9-4.3-5a169.4 169.4 0 0 1-20-31.8 158.9 158.9 0 0 1-14.5-57.1c-1.3-16.4-1.3-129.2 0-145.1a161 161 0 0 1 26.7-79.4c5.1-7.9 5.4-8.7 4.2-10.8l-9.3-13.8c-14.2-21-23.5-42.4-25.9-59.3-1.4-10-3.2-10.8-4.1-1.7zM725 300.1a86.6 86.6 0 0 0-71.1 45.4 64.2 64.2 0 0 0-5.4 41c4.9 18.9 15 29.3 30.4 31.5 14.7 2.1 24-3.8 27.6-17.5 1.9-7.4-.5-15-6.1-19.4-3.9-3.1-15-3-18.9.1a21.2 21.2 0 0 0-6.5 13.9c0 8.7 4.5 13.5 13.9 14.6 5.4.6 6.5 1.7 2.9 2.7-8.8 2.3-20.7-1.4-28.4-8.9-7-6.8-8.7-12.4-8.2-27.8.3-9.8.7-12.1 3.5-19a64.1 64.1 0 0 1 38.2-38.7c24.1-8.8 52.4-5.4 83.2 10 8.5 4.3 10.6 6 19.5 15.2a180.4 180.4 0 0 1 43.9 77.9c10.4 37 10.7 91.9.6 131.2a111.2 111.2 0 0 1-29.9 49.4c-11 8.9-26.5 14-38.5 12.7a56.1 56.1 0 0 1-25.8-12.5c-6.6-6.6-8.3-11-8.4-21.9 0-8.9.2-10 3.6-17 5.8-12.2 13.3-17.9 23.4-18 6.6 0 11.4 2.6 14.3 7.8 6.1 10.9 2.9 21.1-8.8 28.1-4.9 2.9-2.4 2.6 5.2-.6 12.6-5.4 20.4-12 23.4-19.9 3.5-9.3-1.2-23.4-9.7-28.6-3.9-2.5-5.9-2.9-14.6-3.5l-10-.6-7.2 3.8a49.5 49.5 0 0 0-21.3 21.2c-3.3 6.7-3.3 7-3.3 20.8v14l4 8a49.2 49.2 0 0 0 32.1 26.6c7 1.6 24.6 1.3 33.2-.5 20.5-4.3 37.1-16.6 51.9-38.4a167.4 167.4 0 0 0 29.3-79c3.7-35.1-4.5-80.5-19.7-109.2-27.2-51.3-60.9-82.3-100.1-92-6.6-1.6-28.4-4.3-31.7-3.9l-10.5 1zm462.4-.1a86.2 86.2 0 0 0-26.7 5 139.5 139.5 0 0 0-53.4 34.4 231.1 231.1 0 0 0-41.2 58.6 190 190 0 0 0 20.3 198.4 74.7 74.7 0 0 0 65.8 26.6 51.7 51.7 0 0 0 25.4-8.6 47.8 47.8 0 0 0 18.9-19.9c4-8.5 4.7-22.1 1.6-31.4-5.7-16.5-14-28-23.4-32.2-4.4-2-6.9-2.3-16.2-2.3-9.8 0-11.5.2-15.2 2.4-9.7 5.4-14.3 20.9-9.4 31.7 3.4 7.4 14.2 15.6 26.6 20.3 2.6 1 2.3.5-2.2-3.7-6.2-5.8-8.3-10.3-8.3-18 0-7.3 2.3-11.3 8.2-14.2 13.4-6.4 28.1 2.6 33.9 20.9a29.8 29.8 0 0 1-1.1 24.4 38 38 0 0 1-29.2 21.8c-6.7 1-8.2.9-17.6-1.5a56.8 56.8 0 0 1-30.5-18.7c-20.5-21.7-30-54.9-30.1-104.5 0-30.2 3.5-54.1 11.6-79.3 2.6-8.4 3.1-9.2 4.6-8a982 982 0 0 1 34.7 31.9 1321 1321 0 0 0 57.5 48.5c100.9 80.7 187.3 130.4 259 148.8 22.6 5.8 33.7 7.1 60.5 7.1 37.3 0 51.3-2.9 79-16.5 40.7-19.9 64.6-48.4 73.6-88a171 171 0 0 0-2.7-72l-2.6-10.5 5.8-5.4c20.9-19 55.4-43.5 75.4-53.3 23.9-11.7 41-15.4 59.4-12.6a53.2 53.2 0 0 1 33.2 16.3 36.7 36.7 0 0 1 12.4 22.9c2.1 13 .2 22.3-6.5 32.1-7.4 10.7-17.4 15.9-34 17.6-9.9 1.1-10.1 1-19.5-2.1-22.5-7.6-32.1-17.3-32.1-32.3 0-8.1 1.9-12 6.9-14.6 7.8-4 18-3.6 27.4.9 5.3 2.5 5.6 2.5 3-.3-7.2-7.7-21.6-9.5-33-4.3-11.3 5.2-15.8 12.6-15 24.7.6 7.6 3.1 12.9 10.5 21.6 14 16.5 34 24.3 61.6 24.3a71.6 71.6 0 0 0 52.9-22.3 62.4 62.4 0 0 0 14.7-27.5c2.6-12.5.8-27.2-4.6-38a93.1 93.1 0 0 0-32.8-34 75.1 75.1 0 0 0-44.1-9c-12.2.4-15 .9-23.1 3.6-30 10.2-63.3 32.7-118.2 79.9l-3.7 3.1-2.6-5.9-2.6-5.9 6.1-5.4a638.5 638.5 0 0 1 66.2-49.7 215.2 215.2 0 0 1 33.8-17.4c1.5-.4 2.6-1 2.3-1.2-1.4-1.4-31.5 10.2-48.6 18.6a288.6 288.6 0 0 0-58.9 38.5c-4.1 3.4-5.8 4.3-6.8 3.5-.7-.6-4.3-5.7-8.2-11.2a142 142 0 0 0-19.2-22.2c-31.1-30.1-64-48.7-100.4-56.5-14.4-3.2-52.3-4-68-1.5-21.8 3.4-39.9 10-51.8 18.7-21.4 15.9-35.6 34-41.8 53.3a81 81 0 0 0-2.7 23.3c-.5 19.8.4 25.4 6.4 38.2a70 70 0 0 0 41.4 39.3 121 121 0 0 0 43 1.3 72 72 0 0 0 29.5-15.8c11.7-10.9 15.5-20.6 15.5-39.3 0-19.5-4-29.7-16.7-42.4a54.8 54.8 0 0 0-8.8-7.9c-.3.2 1.1 3.6 3 7.4 6.8 13.5 8 18.4 8 33.4 0 12.5-.2 13.9-2.6 19a30.8 30.8 0 0 1-14.6 15.7c-18.6 9.8-35.8 9-57.4-2.3a53.4 53.4 0 0 1-31-41.3 104.3 104.3 0 0 1 11.3-51.9 137 137 0 0 1 33.5-32.6c27.2-16.1 64.2-19.1 104-8.6a151 151 0 0 1 75.9 43.4c15.4 15.5 27.2 33 34.4 51.4l1.3 3.4-9.9 10c-33.2 33.5-59.7 57.1-77.6 69-36.1 24-67.9 38.6-98.3 44.9-6 1.3-10.2 2.5-9.3 2.7.9.2 4-.2 7-.8 2.9-.6 8.6-1.5 12.7-2 10.8-1.3 21.1-3.7 33.6-8a353.3 353.3 0 0 0 48-20.7c19.4-11.1 48.5-34.2 84.7-67.1 7.1-6.4 13.2-11.6 13.6-11.5.4.1 1 2.8 1.3 6 .7 6.9 1.1 6.3-16.6 22.6-59.7 54.7-119 84.2-180.7 89.8-18.3 1.7-55.3.6-70.3-2A273.5 273.5 0 0 1 1282 536a287 287 0 0 1-39.9-23.3c-30.3-20.3-74-54.4-125.3-97.9l-17.6-15 3.4-7.7a154 154 0 0 1 28.9-45 99.6 99.6 0 0 1 31-23.1c11.9-5.8 22.2-8.7 36.5-10.2 37.1-3.9 72.5 17.3 79.6 47.8 2.1 9.3 1.6 30.4-.9 35-5.2 9.7-21.7 17.9-32.1 16-4.5-.9-4.7-2.6-.3-2.6 4.5-.1 11.2-3.3 13.4-6.6 1.2-1.9 1.8-4.7 1.8-9 0-5.3-.4-6.6-2.5-8.9-7.6-8.2-20-8.6-27-1-2.2 2.4-2.5 3.5-2.5 10.8.1 6.8.5 8.9 2.5 12.5 2.9 5.2 7.7 8.3 15 9.8 6.5 1.3 13.1-.1 22.1-4.7a31.3 31.3 0 0 0 16.1-15.7c3.2-6.5 3.3-7 3.3-19.2a50.7 50.7 0 0 0-3.6-22.7c-9.5-27-29-45.7-54.8-52.3-7.2-1.8-25.6-4.2-30.1-3.8l-11.6.8zm448.3 190.2c-.6 20.4-2.5 31.2-7.6 44.3-8.1 21.1-21.1 36.3-44 51.6a149 149 0 0 1-90.5 27c-26.3 0-49.5-3.3-77.7-11.1-21.4-5.9-60.9-21-60.9-23.2 0-.6 1-.8 2.3-.4 22.9 6.8 64.5 7.4 95.7 1.5a405.2 405.2 0 0 0 51.5-14.3c27.1-11 77-46.3 121.5-85.9a84 84 0 0 1 9.4-7.7c.5 0 .6 7.8.3 18.2zM838.5 312c.3.5 1.1 1 1.6 1 .6 0 .7-.5.4-1a2 2 0 0 0-1.6-1c-.6 0-.7.4-.4 1z"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.path,
              {
                animate: { fill: [fill.third, fill.second, fill.first] },
                whileHover: { fill: fill.first },
                transition: {
                  duration: 3,
                  ease: "linear",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                },
                d: "M1085.8 318.5c-4 3-13.3 11-20.7 17.7a110.4 110.4 0 0 0-23.3 27.3c-19.9 30.3-32 60-37.9 93.2-2 10.9-2.3 16.3-2.3 36.8-.1 32.6 2.5 47.7 12.5 72.8 24.1 60.4 62.2 95.6 112.9 104.1a157 157 0 0 0 93.5-11.9 176 176 0 0 0 47.5-33l4.5-4.7-10.1 6.6c-34.8 22.6-68.3 33.7-101.8 33.7a119.6 119.6 0 0 1-98.1-47.6 200.3 200.3 0 0 1-43-102.5c-2.1-16-1.6-46.2 1-62.3a271.5 271.5 0 0 1 25.5-80.6 169.6 169.6 0 0 1 41.3-48.3c5.7-4.3 8-6.8 6.3-6.8-.3 0-3.8 2.5-7.8 5.5zM853.4 324a192.3 192.3 0 0 1 51.2 80.4 232.3 232.3 0 0 1 12.1 72.6c1.2 37.9-5.1 66.6-22.4 101.9a170.6 170.6 0 0 1-30.1 44.3 114.1 114.1 0 0 1-48.2 31.6 144 144 0 0 1-77.5 2.2c-21.4-5-46.4-16.5-69-31.8l-8-5.4 7.7 7.6a160.4 160.4 0 0 0 84.8 43.3c13 2.3 40.1 2.2 53.3-.1a132.7 132.7 0 0 0 70.7-36.3c32.2-34 50.8-73.1 54.9-115.7 1.4-13.8 1.4-36.4.1-48.1-3.5-30.5-16.4-70.4-29.5-90.6-2.6-4-5.1-8.3-5.6-9.7-4.1-10.8-25-32.6-50.4-52.7-2.7-2.2-.1.7 5.9 6.5z"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.path,
              {
                animate: { fill: [fill.first, fill.second, fill.third] },
                whileHover: { fill: fill.first },
                transition: {
                  duration: 3,
                  ease: "linear",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                },
                d: "M427.5 326.9a161.3 161.3 0 0 0-35.9 10.4c-44.3 17.1-76.6 42.1-96 74.4-2.1 3.5-4.3 6.3-5 6.3-.7 0-4.7-2.6-8.7-5.8a335.9 335.9 0 0 0-110.7-57.5c-4.5-1.4-8.2-2.1-8.2-1.6s1.2 1.1 2.7 1.5c26.3 6.1 70.3 33.7 112.5 70.7l6.8 5.9-2.5 4.8a30.5 30.5 0 0 1-3.3 5.4c-.5.3-5.3-3.3-10.7-7.9a336.9 336.9 0 0 0-15.4-12.7c-3.1-2.3-9.6-7.6-14.6-11.7-31.4-26.1-58.9-42.5-83-49.7a98.8 98.8 0 0 0-42.1-1.9A80.6 80.6 0 0 0 70.9 381a58.4 58.4 0 0 0-18.8 34.9 76 76 0 0 0 5.7 32.6 66.4 66.4 0 0 0 43.2 36.7 158 158 0 0 0 44.5-.6 93.3 93.3 0 0 0 37.2-21.4 29.9 29.9 0 0 0 10.1-22.7c.6-10.9-1.6-16.2-8.5-20.5a41.1 41.1 0 0 0-23.6-6.6c-5.5.8-13.5 4.6-16.4 7.9-1.8 1.9-1.7 2 .5.8a47.6 47.6 0 0 1 19.7-4.5c12.1-.1 17.5 5.2 17.5 17.3 0 9.9-5.5 18.2-17.1 26a49 49 0 0 1-37.4 7.6c-25.9-4.1-39.7-19.6-38.2-42.7a52.3 52.3 0 0 1 27.1-40.3 71 71 0 0 1 28.8-6.5c29.9 0 73.9 22.8 121 62.7 4.8 4.1 8.9 7.7 9.2 8.1.3.5-.9 7.3-2.6 15.3-3 13.7-3.1 15.6-3.2 37.9-.1 21.2.1 24.4 2.1 32.2 3.9 15 9.1 27.7 15.4 36.8 27 39.4 63.5 61.1 110.8 66.1 16.2 1.7 48.3.7 63.6-2 53.7-9.5 114-36.4 183.5-81.9 45.6-29.9 80.2-55.6 117.4-87.5a1858 1858 0 0 0 60.1-54.1l9-8.8-11.5 10a1460.3 1460.3 0 0 1-62.2 51l-32.1 24.6c-54.3 41.6-107.1 67-157.8 75.8-12 2-16.5 2.3-42.4 2.3-22.3 0-31.7-.5-40.6-1.8a263.1 263.1 0 0 1-70.3-21.1 260.2 260.2 0 0 1-57.6-35.4 1013.8 1013.8 0 0 1-51.6-42.8l-5.1-4.9.5-6.8c.2-3.7.7-6.7 1.2-6.5.5.2 7 5.9 14.5 12.7 31.6 28.7 60.8 52.2 78.5 63.2a242 242 0 0 0 66.5 27.4 328 328 0 0 0 41.8 7.2c.6-.2-3.3-1.4-8.8-2.6-31-7.2-55.1-16.4-73.6-28.2a42.2 42.2 0 0 0-9.1-4.9c-6.3 0-42.2-29.8-86.8-72.1-13.9-13.2-17.6-17.1-17.8-19.5-.3-3.4 6.4-17.2 15.2-30.9 12.1-18.9 40.7-43.5 64.3-55.4 33.3-16.7 74.5-21.9 106.3-13.4 33 8.7 58.4 28.9 68.7 54.3a89 89 0 0 1 3.9 47.9c-5.9 23.1-27 38.8-58.2 43.3-7.1 1-8.9.9-14.5-.6-21.5-6-31.9-19.2-31.9-40.7a63 63 0 0 1 7.6-30.8 47 47 0 0 0 3.9-9.9c-.3-.3-3.8 2.8-7.8 6.9a55 55 0 0 0-17.7 44c0 8.6.4 12 2.2 16.6a57.6 57.6 0 0 0 28 33.1c10.7 5.2 15.9 6.2 32.7 6.2 15.6 0 20.1-1 32.6-7.1 28.8-14.1 42.8-37.9 41.2-70.4a87 87 0 0 0-8.8-36.7c-17.7-35.3-45.9-55.3-86.2-61.2-14.8-2.2-47.8-2-61.2.3zM309 479.2l21.6 18.9c45 40 84.5 63.5 128.9 76.5a252 252 0 0 0 111.8 5.5 27 27 0 0 1 8.7-1.1c0 1.1-24.5 11.2-40 16.5a291.7 291.7 0 0 1-97 17.6c-21.4 0-36.5-2.5-57.2-9.7-39.6-13.8-66.9-37.6-78.6-68.7a123.8 123.8 0 0 1-7.9-45c-.3-10.1-.2-17.7.3-17.7s4.7 3.2 9.4 7.2zm1464.8-126.5c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zM1208 521c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1a1 1 0 0 0-1 1zm-484.5 1c-.3.5-.1 1 .4 1 .6 0 1.1-.5 1.1-1 0-.6-.2-1-.4-1-.3 0-.8.4-1.1 1z"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.path,
              {
                animate: { fill: [fill.third, fill.second, fill.first] },
                whileHover: { fill: fill.first },
                transition: {
                  duration: 3,
                  ease: "linear",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                },
                d: "M1215 525.9c2.5 2.3 17 14.8 32.2 27.7a483.6 483.6 0 0 0 45.5 35.3c69.7 46.3 130.8 72.7 184.3 79.7 18.3 2.4 60.5 1.5 74.3-1.5a177.7 177.7 0 0 0 89.8-50.1 129.2 129.2 0 0 0 26.7-37.5c6.6-13.2 13.4-34.5 11.1-34.5-.4 0-1.3 1.9-1.9 4.2-2 7.5-11.6 26.1-20.1 38.9a183.6 183.6 0 0 1-43.9 44.8 165.4 165.4 0 0 1-75.8 26.2c-14.4 1.5-51.1.6-64.7-1.5-74.9-11.9-154.5-51.8-244.4-122.4-17.1-13.4-19.2-14.9-13.1-9.3zm-500.5 3.2c-11.5 9.7-45.4 34.7-63.1 46.6-68.8 46.2-129.3 72.4-188.9 81.9-15.5 2.4-53.1 3-68.1 1-41.2-5.4-72.4-21-99.9-49.8a135.2 135.2 0 0 1-29-42.3c-3.1-7.2-6.2-14.1-7-15.5-1.4-2.4-1.4-2.4-1.5-.3 0 4.3 5.3 18.9 10.6 29.3a152.1 152.1 0 0 0 38.2 48.1 176.6 176.6 0 0 0 77.7 39c8.4 1.8 14.2 2.2 36.6 2.6 23.6.5 28.3.3 41.3-1.6 33.7-4.9 69.7-17.2 110.9-37.7 49.4-24.7 83-48 134-92.7 12.8-11.2 15.6-13.9 14.5-13.6-.2 0-3 2.3-6.3 5zM255 544.4c0 .9.5 1.6 1 1.6.6 0 1-.4 1-.9 0-.6-.4-1.3-1-1.6-.5-.3-1 .1-1 .9z"
              }
            )
          ]
        }
      )
    }
  );
};
function TaskCreator() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const tasksWithRefs = tasks.map((task) => ({ ...task, nodeRef: React.createRef() }));
  const handlerTaskSubmit = (e) => {
    var _a;
    e.preventDefault();
    if (!value) return;
    dispatch(addTask({ text: value }));
    setValue("");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handlerTaskDelete = (id) => {
    dispatch(deleteTask({ id }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "task-creator", children: [
    /* @__PURE__ */ jsx(
      FormTask,
      {
        value,
        setValue,
        refForInput: inputRef,
        handlerTaskSubmit
      }
    ),
    /* @__PURE__ */ jsxs(LayoutGroup, { children: [
      /* @__PURE__ */ jsx(ComponentSVG, { rotate: 180 }),
      /* @__PURE__ */ jsx(
        Reorder.Group,
        {
          axis: "y",
          values: tasksWithRefs,
          onReorder: (newOrder) => dispatch(reorderTasks({ tasks: newOrder })),
          as: "ul",
          className: "task-creator__list",
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: tasksWithRefs.length > 0 ? tasksWithRefs.map((task, index) => {
            return /* @__PURE__ */ jsx(
              AnimatedTaskDnd,
              {
                ref: task.nodeRef,
                task,
                position: index,
                handlerTaskDelete: () => handlerTaskDelete(task.id)
              },
              task.id
            );
          }) : /* @__PURE__ */ jsx(NoTaskComponent, {}) })
        }
      ),
      /* @__PURE__ */ jsx(ComponentSVG, {})
    ] })
  ] });
}
export {
  TaskCreator as default
};
