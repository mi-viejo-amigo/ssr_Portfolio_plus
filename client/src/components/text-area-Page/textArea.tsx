import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faWindowMinimize , faCopy, faExpand  } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button'
// interface TextAreaProps {

// }

const TextArea = () => {

    const [open, setOpen] = useState(true);
    const [isWrapped, setIsWrapped] = useState(false);


    const handleClose = () => {
        // анимация на закрытие сломана, и может конфликтовать с анимацией переключения табов.
        setOpen(false);
    }

    const handleWrapperClick = () => {
        setIsWrapped((prev)=> !prev);
    }

    // let days;
    // let hours;
    // let minutes;
    // let seconds;
    const [{days, hours, minutes, seconds}, setTime] = useState({days: 2, hours: 0, minutes: 0, seconds: 0});

    useEffect(() => {
        const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = +endDate - +now;

            if (timeDifference <= 0) {
                clearInterval(countDownTimer);
                setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTime({
                days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
            });
        };

        const countDownTimer = setInterval(updateCountdown, 1000);

        // Запускаем обновление таймера сразу
        updateCountdown();

        // Очищаем таймер при размонтировании
        return () => clearInterval(countDownTimer);
    }, []); // Пустой массив зависимостей — эффект выполнится только при монтировании  
    
    return (
        <LayoutGroup>
            {open && (
                <motion.div
                    className='text-area_wrapper'
                    layout
                >   

                    <motion.article
                        className={`text-area_window${isWrapped ? '-preview' : ''}`}
                        layout
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        { !isWrapped ? (
                            <>
                                <header className='text-area_header'>
                                    <Button className='text-area_button text-area_button_extended' onClick={handleClose}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                    <Button className='text-area_button' onClick={() => {}}>
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                    <Button className='text-area_button' onClick={handleWrapperClick}>
                                        <FontAwesomeIcon icon={faWindowMinimize} />
                                    </Button>
                                    <p style={{ marginLeft: 'auto' }}>C:\ Text_area.txt</p>
                                </header>
                                <main className='text-area_main'>
                                    <textarea
                                        placeholder="Введите текст"
                                        rows={17}
                                        cols={65}
                                        className='text-area_input'
                                    ></textarea>
                                </main>
                                <footer className='text-area_footer'>
                                     <div>Обратный отсчет: {days} дн. {hours} ч. {minutes} мин. {seconds} сек.</div> 
                                    <p>{new Date().getFullYear()} © Все права защищены</p>
                                </footer>
                            </>
                        ) : (   
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
                                >
                                    <Button
                                        className='text-area_button text-area_button_wrapped-icon'
                                        onClick={handleWrapperClick}
                                    >
                                        <FontAwesomeIcon icon={faExpand} />
                                    </Button>
                                </motion.div>
                            )}
                    </motion.article>
                </motion.div>
            )}
        </LayoutGroup>
    );
};

export default TextArea