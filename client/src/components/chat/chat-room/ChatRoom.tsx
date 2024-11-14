import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './chatRoom.module.css'
import Messages from '../messages/Messages';
import EmojiPicker, { Theme, EmojiClickData  } from 'emoji-picker-react';
import icon from '../../../assets/emoji-icon-big.png'
import io from 'socket.io-client';
// import clsx from 'clsx';

const socket = io('http://localhost:5173');

type ChatParams = {
    [k: string]: string
}

export type sendParams = {
    userMessage: string
    params: {
        room: string
        name: string
    }
}

 export interface Data {
    user: {
        name: string
        room?: string
    }
    message: string;
}

interface IRoomData {
    data: {
        users: string[]
    }
}

interface Message {
    data: Data
}

const ChatRoom = () => {
    const { search } = useLocation();
    const [params, setParams] = useState<ChatParams>({room: '', name: ''});
    const [messages, setMessages] = useState<Data[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [users, setUsers] = useState<number>(0);
    const emojiRef = useRef<HTMLDivElement | null>(null); // Ссылка на контейнер с эмодзи
    const mainRef = useRef<HTMLDivElement | null>(null); // Ref для main
    const navigate = useNavigate();

    const handleUserMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(e.target.value);
    };

    const emojiClick = ({ emoji }: EmojiClickData ) => {
        setUserMessage(`${userMessage} ${emoji}`)
        setEmojiOpen(false)
    }

    const openEmoji = ( e: React.SyntheticEvent ) => {
        e.stopPropagation()
        setEmojiOpen(true);
    }

    const closeEmoji = (e: React.SyntheticEvent) => {
        // закрытие эмодзи по любому места окна, то только окна чата =(
        if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
            setEmojiOpen(false);
        }
    };

    const leaveRoom = () => {
        socket.emit('leaveRoom', params);
        navigate('/chatpage');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userMessage) return;
        socket.emit('sendMessage', { userMessage, params } as sendParams);
        setUserMessage('');
    };

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);
    
    useEffect(() => {
        const handleMessage = ({data}: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        const hendleRoomData = ({ data: { users } }: IRoomData) => {
            setUsers(users.length);
        };

        socket.on('message', handleMessage);
        socket.on('roomData', hendleRoomData);

        // Очистка слушателя при размонтировании компонента
        return () => {
            socket.off('message', handleMessage);
            socket.off('roomData', hendleRoomData);
        };
    }, []);


    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTop = mainRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <>
        <div className={styles.wrapper} onClick={closeEmoji}>
            <header className={styles.header}>
                <div>
                <div className={styles.title}>
                    Room: <strong className={styles.roomName}>{params?.room}</strong>
                </div>
                <div className={styles.users}>{users} users in this room</div>
                </div>
                <button className={styles.button} onClick={leaveRoom}>Logout</button>
            </header>
            <main className={styles.main} ref={mainRef}>
                <Messages messages={messages} name={params.name} />
            </main>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    name='message'
                    className={styles.input}
                    type="text"
                    placeholder='your message...'
                    onChange={handleUserMessage}
                    value={userMessage}
                    autoComplete='off'
                    required
                 />  
                    
                    <div className={styles.emoji} onClick={openEmoji} >
                        <img src={icon} alt="emoji icon" className={styles.emojiIcon} />
                    </div>
                    {emojiOpen && (
                        <div className={styles.emojiList} ref={emojiRef} >
                                <EmojiPicker
                                    onEmojiClick={emojiClick}
                                    lazyLoadEmojis
                                    open={emojiOpen}
                                    theme={'dark' as Theme | undefined} 
                                    // emojiStyle={'apple' as EmojiStyle | undefined}
                                />
                        </div>
                    )}
                <button className={styles.button} type='submit'>Send</button>
            </form>
        </div>
        </>
    )
}

export default ChatRoom