import React, { useState, useRef } from 'react'
// import { useDrop} from 'react-dnd'
import { AnimatePresence, Reorder, LayoutGroup } from 'framer-motion';
import 'animate.css'
import AnimatedTaskDnd from '../taskDndAnimated/AnimatedItemDnd'
// import HeadingTask from '../taskHeading/HeadingTask'
import FormTask from '../formTask/FormTask'
import NoTaskComponent from '../noTaskComponent/NoTaskComponent'
import ComponentSVG from '../componentSVG/ComponentSVG';
import { addTask, deleteTask, reorderTasks, TInitialState } from '../../services/slice/TaskSlice';
import { useDispatch, useSelector, RootState } from '../../services/store/store';

export type TaskStatus = 'initial' | 'done' | 'failed';

export type TaskWithRef = {
    id: string
    text: string
    fixedTickPath: number | null;
    fixedCrossPathA: number | null;
    fixedCrossPathB: number | null;
    checkBoxfixedColor: null | string
    fixedBackground: null | string
    isFixed: boolean
    nodeRef: React.RefObject<HTMLLIElement> | null;
}

export default function TaskCreator() {
    const [value, setValue] = useState('');
    // const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    // Берем таски из стора, и следующей строкой в компоненте добавляем им всем рефы. 
    // Используем их уже с рефами.
    const { tasks }: TInitialState = useSelector((state: RootState) => state.tasks);
    const tasksWithRefs: TaskWithRef[] = tasks.map((task) => ({ ...task, nodeRef: React.createRef<HTMLLIElement>() }));

    const handlerTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) return
        dispatch(addTask({ text: value }))
        setValue('')
        inputRef.current?.focus()
    }
    const handlerTaskDelete = (id: string) => {
        dispatch(deleteTask({ id }))
    }
    return (
        <div className='task-creator'>
            {/* <HeadingTask /> */}
            <FormTask
                value={value}
                setValue={setValue}
                refForInput={inputRef}
                handlerTaskSubmit={handlerTaskSubmit}
            />
            <LayoutGroup>
                <ComponentSVG rotate={180} />
                <Reorder.Group
                    axis={"y"}
                    values={tasksWithRefs}
                    onReorder={(newOrder) => dispatch(reorderTasks({ tasks: newOrder }))}
                    as='ul'
                    className="task-creator__list"
                >
                    <AnimatePresence mode="popLayout" >
                    { tasksWithRefs.length > 0 ? (
                        tasksWithRefs.map((task: TaskWithRef, index: number) => {
                            return (
                                    <AnimatedTaskDnd
                                        key={task.id}
                                        ref={task.nodeRef}
                                        task={task}
                                        position={index}
                                        handlerTaskDelete={() => handlerTaskDelete(task.id)}
                                    />
                            )
                        })
                    ) : <NoTaskComponent />}
                    </AnimatePresence>
                </Reorder.Group>
                <ComponentSVG />
            </LayoutGroup>
        </div>
    )
}
