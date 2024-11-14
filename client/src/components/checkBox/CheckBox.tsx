import * as React from "react";
import { chengeFixedCheckBoxColor, updateFixedPaths } from '../../services/slice/TaskSlice';
import { useDispatch, useSelector, RootState } from '../../services/store/store';
import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
    x: MotionValue<number>;
    xInput: number[];
    taskId: string;
    onFixBackground: (reset: boolean) => void;
}

const CheckBox = ({ x, xInput, taskId, onFixBackground }: Props) => {
  const dispatch = useDispatch();
  
  const task = useSelector((state: RootState) => state.tasks.tasks.find((task) => task.id === taskId));
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "#646cffaa",
    "rgb(3, 209, 0)"
  ]);

    // Безусловные вызовы useTransform
    const dynamicTickPath = useTransform(x, [5, 20], [0, 1]);
    const dynamicCrossPathA = useTransform(x, [-5, -20], [0, 1]);
    const dynamicCrossPathB = useTransform(x, [-5, -30], [0, 1]);

    // Используем значения из Redux или динамические значения в зависимости от isFixed
    const tickPath = task?.isFixed ? task.fixedTickPath ?? 0 : dynamicTickPath;
    const crossPathA = task?.isFixed ? task.fixedCrossPathA ?? 0 : dynamicCrossPathA;
    const crossPathB = task?.isFixed ? task.fixedCrossPathB ?? 0 : dynamicCrossPathB;


  const handleDragEnd = () => {
    if (x.get() >= 40 || x.get() <= -40) {
      dispatch(chengeFixedCheckBoxColor({ id: taskId, color: color.get()}));
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

  return (
    <motion.div
        className="box"
        style={{ x }}
        drag="x"
        dragElastic={0.4} 
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <svg className="progress-icon" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={task?.checkBoxfixedColor || color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            className='progress-icon_path-circle'
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={task?.checkBoxfixedColor || color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray={task?.isFixed && task.fixedTickPath ? "1 1" : "0 1"}
            pathLength={tickPath}
            // style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={task?.checkBoxfixedColor || color}
            d="M17,17 L33,33"
            strokeDasharray={task?.isFixed && task.fixedCrossPathA ? "1 1" : "0 1"}
            pathLength={crossPathA}
            // style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={task?.checkBoxfixedColor || color}
            d="M33,17 L17,33"
            strokeDasharray={task?.isFixed && task.fixedCrossPathB ? "1 1" : "0 1"}
            pathLength={crossPathB}
            // style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
  );
};

export default CheckBox