import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Tabs } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faInstagram, faGithub, faVk } from '@fortawesome/free-brands-svg-icons';
// had to comment out styles, becouse of SSR render of the welcome page
// import styles from './welcomePage.module.css';
import Modal from '../components/modal/Modal';

const sotials = [
    { name: 'Telegram', icon: faTelegram },
    { name: 'Instagram', icon: faInstagram },
    { name: 'Github', icon: faGithub },
    { name: 'VK', icon: faVk },
];

interface WelcomePageProps {
    changeTab: React.Dispatch<React.SetStateAction<Tabs | null>>
}

const WelcomePage = ({ changeTab }: WelcomePageProps) => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect( () => {
        changeTab(null)
    }, [changeTab]);

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleNavigation = (path: Tabs) => {
        changeTab(path);
        navigate(`/${path}`);
    };

    return (
        <div className='welcomeWrapper'>
            <header className='header'>
                <h1>Добро пожаловать в мой проект!</h1>
                <p>Я, Frolov Nikita, Frontend Developer, представляю демо-страницу для тестирования различных вкладок и функций.</p>
            </header>

            <section className='profileSection'>
                <div className='profileSotials'>
                    <h2 className='profileSotialsTitle'>Мои социальные сети:</h2>
                    <div className='profileSotialsIconWrapper'>
                        {sotials.map((sotial) => (
                                <a href="#" key={sotial.name}>
                                    <div className='sotialIcon'>
                                        <FontAwesomeIcon icon={sotial.icon} />
                                    </div>
                                </a>
                            )
                        )}
                    
                    </div>
                </div>
                <div className='profileCard' >
                    <img src="src\assets\nikita_foto.jpg" alt="autor foto" className='profileImage' onClick={openModal} />
                    <AnimatePresence>
                        {isModalOpen && (
                            <Modal closeModal={closeModal}> 
                                <img src="src\assets\nikita_foto.jpg" alt="autor foto" className='profileImageModal' />
                            </Modal>
                        )}
                    </AnimatePresence>
                    <div className='profileInfo'>
                        <h2>Frolov Nikita</h2>
                        <p>Frontend Developer | React Enthusiast</p>
                        <p className='description'>Исследуйте мои разработки и посмотрите, что я создал. Каждая вкладка демонстрирует уникальный функционал.</p>
                    </div>
                </div>
            </section>

            <section className='tabsSection'>
                <h2>Попробуйте мои вкладки:</h2>
                <div className='tabCards'>
                    {[
                        { title: 'Tasks', description: 'Drag-and-drop менеджер задач.', path: 'tasks' },
                        { title: 'Text Area', description: 'Редактор текста для заметок.', path: 'textarea' },
                        { title: 'Chat Page', description: 'Чат с WebSocket для обмена сообщениями.', path: 'chatpage' },
                        { title: 'Galery', description: 'Галерея изображений в высоком разрешении.', path: 'galery' }
                    ].map(tab => (
                        <div
                            key={tab.path}
                            className='tabCard'
                            onClick={() => handleNavigation(tab.path as Tabs)}
                        >
                            <h3>{tab.title}</h3>
                            <p>{tab.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className='footer'>
                <h3>Документация:</h3>
                <p>Каждая вкладка реализует уникальную логику с использованием React, Router и других библиотек, таких как Redux и WebSocket.</p>
                <p>Проект создан для демонстрации моих навыков во фронтенд-разработке и современных технологий.</p>
            </footer>
        </div>
    );
};

export default WelcomePage;