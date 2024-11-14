import { motion } from 'framer-motion'


const HeadingTask = () => {
  return (
    <motion.h1
            layout
            className="task-creator__title"
            initial={{ scale: 0.8, opacity: 0, x: -200  }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 10 }}

            >
                TaskCreator
        </motion.h1>
  )
}



export default HeadingTask