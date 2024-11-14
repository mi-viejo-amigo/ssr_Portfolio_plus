import React from 'react'
import { motion } from 'framer-motion'

interface wrapperProps {
    className?: string
    children?: React.ReactNode
}

const AnimatedWrapper = ({className, children}: wrapperProps) => {
  return (
    <motion.div className={className} >{children}</motion.div>
  )
}

export default AnimatedWrapper