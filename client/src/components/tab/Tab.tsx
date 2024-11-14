import { motion } from 'framer-motion'
// import '../../App.css'
interface TabProps {
    title: string
    isActive: boolean
    borderRadius?: string
    handleTabClick: () => void
}

const Tab = ({title, isActive, borderRadius, handleTabClick}: TabProps) => {

  return (
    <>
    <motion.div 
        className={`tab ${isActive ? 'tab_active' : ''}`}
        onClick={handleTabClick}
        style={{borderRadius: borderRadius}}
        >
        <p>{title}</p>
        {isActive ? (
            <motion.div className="underline" layoutId="underline" />
            ) : null
        }
    </motion.div>

    </>
  )
}

export default Tab