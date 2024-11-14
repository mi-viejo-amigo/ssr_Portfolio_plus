import {
    createSlice,
    PayloadAction,
    nanoid
  } from '@reduxjs/toolkit';
import { TaskWithRef } from '../../components/task-creator/TaskCreator';

// import { createRef } from 'react';

export interface Task {
  id: string;
  text: string;
  checkBoxfixedColor: string | null;
  fixedBackground: string | null;
  fixedTickPath: number | null;
  fixedCrossPathA: number | null;
  fixedCrossPathB: number | null;
  isFixed: boolean; // Новый флаг для фиксации
}

export type TInitialState = {
    tasks: Task[];
  };

  enum taskBackgroundColor {
    red = "linear-gradient(90deg, rgb(125, 45, 62) 0%, rgb(47, 45, 62) 70%)",
    initial = "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",
    green = "linear-gradient(90deg, rgb(47, 105, 62) 0%, rgb(47, 45, 62) 70%)"
  }

  export enum TCheckBoxFixedColor {
    done = "rgb(3, 209, 0)",
    initial = "#646cffaa",
    failed = "rgb(211, 9, 225)"
  }

  const initialState: TInitialState = {
    tasks: [
        { id: nanoid(),
          text: 'Убить Билла',
          fixedTickPath: null,
          fixedCrossPathA: null,
          fixedCrossPathB: null,
          checkBoxfixedColor: TCheckBoxFixedColor.initial,
          fixedBackground: taskBackgroundColor.initial,
          isFixed: false
        },
        { id: nanoid(),
          text: 'Покормить собаку',
          fixedTickPath: null,
          fixedCrossPathA: null,
          fixedCrossPathB: null,
          checkBoxfixedColor: TCheckBoxFixedColor.initial,
          fixedBackground: taskBackgroundColor.initial,
          isFixed: false
        },
        { id: nanoid(),
          text: '8 раз обнять Полинку <3',
          fixedTickPath: null,
          fixedCrossPathA: null,
          fixedCrossPathB: null,
          checkBoxfixedColor: TCheckBoxFixedColor.initial,
          fixedBackground: taskBackgroundColor.initial,
          isFixed: false
        },
    ]
  };


  const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<{ text: string }>) => {
        state.tasks.push({
          id: nanoid(),
          text: action.payload.text,
          fixedTickPath: null,
          fixedCrossPathA: null,
          fixedCrossPathB: null,
          checkBoxfixedColor: TCheckBoxFixedColor.initial,
          fixedBackground: taskBackgroundColor.initial,
          isFixed: false
        });
      },
      reorderTasks: (state, action: PayloadAction<{ tasks: TaskWithRef[] }>) => {
        state.tasks = action.payload.tasks
      },
      deleteTask: (state, action: PayloadAction<{ id: string }>) => {
        state.tasks = state.tasks.filter((task: Task) => task.id !== action.payload.id);
      },
      chengeFixedCheckBoxColor: (state, action: PayloadAction<{ id: string, color: string | null }>) => {
        state.tasks = state.tasks.map((task: Task) => {
          if (task.id === action.payload.id) {
            task.checkBoxfixedColor = action.payload.color
          }
          return task
        })
      },
      chengeBackgroundColor: (state, action: PayloadAction<{ id: string, color: string | null }>) => {
        state.tasks = state.tasks.map((task: Task) => {
          if (task.id === action.payload.id) {
            task.fixedBackground = action.payload.color
          }
          return task
        })
      },
      updateFixedPaths: (state, action: PayloadAction<{ id: string; tickPath: number | null; crossPathA: number | null; crossPathB: number | null, isFixed: boolean }>) => {
        state.tasks = state.tasks.map((task: Task) => {
          if (task.id === action.payload.id) {
            task.fixedTickPath = action.payload.tickPath;
            task.fixedCrossPathA = action.payload.crossPathA;
            task.fixedCrossPathB = action.payload.crossPathB;
            task.isFixed = action.payload.isFixed; // Устанавливаем флаг фиксации
          }
          return task
        })
      },
    },
    // selectors: {
    //   getTaskById: (state) => ( id: string): Task | string => {
    //     return state.tasks.find((task) => task.id === id) || 'task not found';
    //   },
    // },

  });
  
  export const { addTask, deleteTask, chengeFixedCheckBoxColor, reorderTasks, chengeBackgroundColor, updateFixedPaths } = taskSlice.actions;
  // export const { getTaskById } = taskSlice.selectors;
  export default taskSlice;