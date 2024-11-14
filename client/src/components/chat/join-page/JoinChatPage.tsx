import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './joinChat.module.css'
const JoinChatPage = () => {
    const navigate = useNavigate();
    const [ values, setValues ] = useState({ name: '', room: '' });

    const handleInput = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: value });
    }

    const hendleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        const isDisabled = Object.values(values).some((v) => !v);
        if (isDisabled) return

        e.preventDefault();
        // console.log(values)
        navigate(`/chatroom?name=${values.name}&room=${values.room}`);
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <h2 className={styles.title}>Join</h2>
            <form className={styles.form} onSubmit={hendleSubmit}>
                <input
                    name='name'
                    className={styles.input}
                    type="text"
                    placeholder='name'
                    onChange={handleInput}
                    value={values.name}
                    autoComplete='off'
                    required
                />
                <input
                    name='room'
                    className={styles.input}
                    type="text"
                    placeholder='room'
                    onChange={handleInput}
                    value={values.room}
                    autoComplete='off'
                    required
                />
                <button className={styles.button} type='submit' >sing in</button>
            </form>
        </div>
    </div>
  )
}

export default JoinChatPage