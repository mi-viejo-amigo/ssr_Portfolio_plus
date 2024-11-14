// import './../../App.css'

interface ButtonProps {
    onClick: () => void
    children?: React.ReactNode
    size?: number
    className?: string
}
const Button = function({onClick, children, size = 15, className}: ButtonProps) {
  return (
    <button style={{padding: `${size}px`}} className={className} onClick={onClick}>{children}</button>
  )
}


export default Button
