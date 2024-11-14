import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, lazy, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import  WithLoader from './hoc/withLoader.tsx';
import Tab from './components/tab/Tab.tsx';
import TextArea from './components/text-area-Page/textArea.tsx';
import WelcomePage from './pages/welcomePage.tsx';
import JoinChatPage from './components/chat/join-page/JoinChatPage.tsx';
import ChatRoom from './components/chat/chat-room/ChatRoom.tsx';
// Lazy components
const TaskCreator = lazy(()=> import('./components/task-creator/TaskCreator.tsx'));
const Galery = lazy(() => import('./components/galery/Galery.tsx'));

export type Tabs = 'tasks' | 'textarea' | 'galery' | 'chatpage';

export function App() {
  const [activeTab, setActiveTab] = useState<Tabs | null>(null);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab: Tabs) => {
    setDirection(activeTab ? (tabsOrder[tab] > tabsOrder[activeTab] ? 1 : -1) : 1);
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };

  // При загрузке страницы сбрасываем URL на "/" если вкладка не активна
  useEffect(() => {
    if (!activeTab && location.pathname !== '/') {
      navigate('/');
    }
  }, [location, activeTab, navigate]);

  const tabsOrder = {
    'tasks': 0,
    'textarea': 1,
    'chatpage': 2,
    'galery': 4
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const tabAnimationSettings = {
    custom: direction,
    variants: variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  };

  return (
    <>
      <div className="tabs-wrapper">
        <Tab title="Tasks" isActive={activeTab === 'tasks'} handleTabClick={() => handleTabClick('tasks')} borderRadius="10px 0 0 10px" />
        <Tab title="TextArea" isActive={activeTab === 'textarea'} handleTabClick={() => handleTabClick('textarea')} borderRadius="0 0 0 0" />
        <Tab title="Chat" isActive={activeTab === 'chatpage'} handleTabClick={() => handleTabClick('chatpage')} borderRadius="0 0 0 0" />
        <Tab title="Galery" isActive={activeTab === 'galery'} handleTabClick={() => handleTabClick('galery')} borderRadius="0 10px 10px 0" />
      </div>

      <AnimatePresence custom={direction} mode="wait">
      <Routes>
          <Route path="/" element={<WelcomePage changeTab={setActiveTab} />} />
          <Route
            path="/tasks"
            element={
              activeTab === 'tasks' ? (
                <motion.div key="tasks" {...tabAnimationSettings} className="card">
                  <DndProvider backend={HTML5Backend}>
                    <WithLoader>
                      <TaskCreator />
                    </WithLoader>
                  </DndProvider>
                </motion.div>
              ) : null
            }
          />
          <Route
            path="/textarea"
            element={
              activeTab === 'textarea' ? (
                <motion.div key="textarea" {...tabAnimationSettings}>
                  <TextArea />
                </motion.div>
              ) : null
            }
          />
          <Route
            path="/chatpage"
            element={
              activeTab === 'chatpage' ? (
                <motion.div className="chatPage" key="chatpage" {...tabAnimationSettings}>
                  <JoinChatPage />
                </motion.div>
              ) : null
            }
          />
          <Route
            path="/galery"
            element={
              activeTab === 'galery' ? (
                <motion.div key="Galery" {...tabAnimationSettings}>
                  <WithLoader>
                    <Galery />
                  </WithLoader>
                </motion.div>
              ) : null
            }
          />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;