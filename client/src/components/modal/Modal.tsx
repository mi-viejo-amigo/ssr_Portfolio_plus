import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import styles from './modal.module.css'

interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode
}

const Modal = function({closeModal, children}: ModalProps) {
    const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Устанавливаем флаг, что код выполняется на клиенте
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
    const modalRoot = document.getElementById('modals');
    return ReactDOM.createPortal(
                <motion.div
                  className={styles.modal}
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0}}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.overlay} onClick={closeModal}/>
                  <motion.div
                    className={styles.popup}
                    initial={{ scale: 0.5}}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5}}
                    transition={{ duration: 0.3 }}
                  >
                      {children}
                      <button className={styles.button} onClick={closeModal}>Close</button>
                  </motion.div>
                </motion.div>,
            modalRoot!
        );
}

export default Modal