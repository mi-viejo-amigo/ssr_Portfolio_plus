import { Data } from '../chat-room/ChatRoom'
import { motion } from 'framer-motion'
import styles from './message.module.css'
import clsx from 'clsx'

interface IMessage {
    messages: Data[]
    name: string
}


const Messages = ({ messages, name }: IMessage) => {


    return (
        <div className={styles.messages}>
            {messages.map((message, index) => {
                const isMe = message.user.name.trim().toLowerCase() === name.toLowerCase();
                const messageClass = isMe ? styles.myMessage : styles.otrerMessage;
                const inHover = { 
                    scale: 1.05,
                    background: isMe ? 'linear-gradient(145deg, #2a2f3b, #333946)' : 'linear-gradient(145deg, #404652, #2f343d)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
                }

                return (
                    <motion.div
                        key={index}
                        className={clsx(styles.message, messageClass)}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Имя пользователя */}
                        <div className={styles.messageUser}>
                            {message.user.name}
                        </div>
                        {/* Основной текст сообщения с фоном и тенями */}
                        <motion.div
                            className={styles.messageTextContainer}
                            whileHover={inHover}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.messageText}>
                                {message.message}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Messages;