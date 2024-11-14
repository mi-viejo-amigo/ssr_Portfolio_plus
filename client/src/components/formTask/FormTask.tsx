import React from 'react'
import { motion } from 'framer-motion'

interface FormTaskProps {
    value: string
    refForInput: React.RefObject<HTMLInputElement>
    setValue: (value: string) => void
    handlerTaskSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormTask = ({value, refForInput, setValue, handlerTaskSubmit}: FormTaskProps) => {
  return (
    <>
    <motion.form 
            className='task-creator__form' 
            onSubmit={handlerTaskSubmit}
        >
            <motion.input
                className="task-creator__input"
                placeholder="Write here..."
                ref={refForInput}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                whileFocus={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(100, 100, 255, 0.5)" }}
                transition={{ type: "linear", stiffness: 60, damping: 10 }}
            />
            <button disabled={!value}>Add</button>
        </motion.form>
        </>
  )
}

export default FormTask