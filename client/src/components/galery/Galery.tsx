import { useState } from 'react'
import clsx from 'clsx';
// import { nanoid } from '@reduxjs/toolkit';
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from "popmotion";
import { images, imagesLove } from './picture/image-data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
// const Picture = lazy(() => import('./picture/Picture'))
import styles from './galery.module.css'

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const Galery = () => {
  const [currentAlbum, setCurrentAlbum] = useState(images);
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, currentAlbum.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const makeLove = () => {
    setCurrentAlbum(imagesLove);
  }


  return (
    <>
    <motion.div
      className={styles.galeryWrapper}
    >
      <AnimatePresence>
        { currentAlbum === images && (
          <motion.div
            className={styles.loveIcon}
            onClick={() => makeLove()}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, -5, 0, 5, 0], // Сдвиг влево и вправо для качания
              rotate: [0, -10, 0, 10, 0], // Поворот для качания
              scale: [1, 1.3, 1, 1.3, 1],
              opacity: [0.5, 1, 0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity, // Зацикливание анимации
              repeatType: "loop"
            }}
            exit={{opacity: 0, transition: { duration: 3 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            whileHover={{ scale: 1.2, rotate: -5, x: 0, transition: { duration: 0.7 } }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        custom={direction}
      >
        <motion.div
          key={`${currentAlbum === images ? 'images' : 'imagesLove'}-${page}`}
          className={clsx({
            [styles.galeryPictureWrapper]: currentAlbum === images,
            [styles.galeryPictureWrapperLove]: currentAlbum === imagesLove
          })}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
            <motion.img
              src={currentAlbum[imageIndex]}
              className={styles.galeryPicture}
            />
          </motion.div>
      </AnimatePresence>
        <motion.div
          className={clsx(styles.next)}
          onClick={() => paginate(1)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {"▶"}
        </motion.div>
        <motion.div
          className={clsx(styles.prev)}
          onClick={() => paginate(-1)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {"◀"}
        </motion.div>
    </motion.div>
    </>
  )
}

export default Galery