import React from 'react';
import Button from '../button/Button'
import { Reorder, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import type { TaskWithRef } from '../task-creator/TaskCreator'
import { ReorderIcon } from '../dragControls/DragControls'
import CheckBox from '../checkBox/CheckBox'
import { useDispatch } from '../../services/store/store';
import { chengeBackgroundColor } from '../../services/slice/TaskSlice';

interface AnimatedTaskDndProps {
    task: TaskWithRef
    position: number
    ref: React.Ref<HTMLLIElement>; // Прокидываем реф
    // moveTask: (dragIndex: number, hoverIndex: number) => void
    handlerTaskDelete: () => void
}

const AnimatedTaskDnd = React.forwardRef<HTMLLIElement, AnimatedTaskDndProps>(
  ({ task, position, handlerTaskDelete }, forwardedRef) => {
    const { fixedBackground } = task;
    const dispatch = useDispatch();
    const controls = useDragControls();

    const x = useMotionValue(0);
    const xInput = [-40, 0, 40];
    const background = useTransform(x, xInput, [
      "linear-gradient(90deg, rgb(125, 45, 62) 0%, rgb(47, 45, 62) 70%)",  // красный
      "linear-gradient(90deg, rgb(47, 45, 62) 0%, rgb(47, 45, 62) 70%)",    // оригинальный цвет
      "linear-gradient(90deg, rgb(47, 105, 62) 0%, rgb(47, 45, 62) 70%)"   // зелёный
    ]);

        // Функция для фиксации background
    const handleFixBackground = (reset: boolean) => {
      // console.log(fixedBackground)
      if (reset) {
        dispatch(chengeBackgroundColor({ id: task.id, color: null }))
      } else {
        dispatch(chengeBackgroundColor({ id: task.id, color: background.get() }))
      }
      
    };

    return (
        <Reorder.Item
          value={task} 
          as='li'
          dragListener={false}
          dragControls={controls}
          ref={forwardedRef}
          layout
          layoutDependency={position}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          whileDrag={{ scaleX: 1.1, scaleY: 1.2, cursor: "grabbing", boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', zIndex: 1 }}
          className="task-creator__item" // добавлен класс для анимации появления
          style={{ background: fixedBackground ?? background }}
        >
              <div className='task-creator__item-content-wrapper'>
                <span className='task-creator__counter'>
                  {position + 1}
                </span>
                <ReorderIcon dragControls={controls} />
              </div>
              <div className='task-creator__item-text'>
                {task.text}
              </div>

              <CheckBox x={x} xInput={xInput} taskId={task.id} onFixBackground={handleFixBackground} />
              <Button className='task-creator__delete-button' size={20} onClick={handlerTaskDelete} />
        </Reorder.Item>
    )
});

export default AnimatedTaskDnd