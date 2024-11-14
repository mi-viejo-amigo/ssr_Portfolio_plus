import { motion } from 'framer-motion'

const NoTaskComponent = () => {
  return (
    <motion.h2
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1.5, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{ duration: 0.3 }}
    >
        No tasks yet
    </motion.h2>
  )
}

export default NoTaskComponent