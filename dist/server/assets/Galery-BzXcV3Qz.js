import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
];
const imagesLove = [
  "src/assets/p2.jpeg",
  "src/assets/p3.jpeg",
  "src/assets/p4.jpeg",
  "src/assets/p5.jpeg",
  "src/assets/photo_5872737542825166158_y.jpg"
];
const galeryWrapper = "_galeryWrapper_16pu9_1";
const galeryPictureWrapperLove = "_galeryPictureWrapperLove_16pu9_21";
const galeryPictureWrapper = "_galeryPictureWrapper_16pu9_21";
const loveIcon = "_loveIcon_16pu9_53";
const galeryPicture = "_galeryPicture_16pu9_21";
const next = "_next_16pu9_95";
const prev = "_prev_16pu9_97";
const styles = {
  galeryWrapper,
  galeryPictureWrapperLove,
  galeryPictureWrapper,
  loveIcon,
  galeryPicture,
  next,
  prev
};
const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1e3 : -1e3,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1e3 : -1e3,
      opacity: 0
    };
  }
};
const Galery = () => {
  const [currentAlbum, setCurrentAlbum] = useState(images);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, currentAlbum.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  const makeLove = () => {
    setCurrentAlbum(imagesLove);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: styles.galeryWrapper,
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: currentAlbum === images && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: styles.loveIcon,
            onClick: () => makeLove(),
            initial: { opacity: 0 },
            animate: {
              x: [0, -5, 0, 5, 0],
              // Сдвиг влево и вправо для качания
              rotate: [0, -10, 0, 10, 0],
              // Поворот для качания
              scale: [1, 1.3, 1, 1.3, 1],
              opacity: [0.5, 1, 0.5, 1, 0.5]
            },
            transition: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              // Зацикливание анимации
              repeatType: "loop"
            },
            exit: { opacity: 0, transition: { duration: 3 } },
            whileTap: { scale: 0.9, transition: { duration: 0.1 } },
            whileHover: { scale: 1.2, rotate: -5, x: 0, transition: { duration: 0.7 } },
            children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faHeart })
          }
        ) }),
        /* @__PURE__ */ jsx(
          AnimatePresence,
          {
            initial: false,
            custom: direction,
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: clsx({
                  [styles.galeryPictureWrapper]: currentAlbum === images,
                  [styles.galeryPictureWrapperLove]: currentAlbum === imagesLove
                }),
                custom: direction,
                variants,
                initial: "enter",
                animate: "center",
                exit: "exit",
                transition: {
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                },
                children: /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    src: currentAlbum[imageIndex],
                    className: styles.galeryPicture
                  }
                )
              },
              `${currentAlbum === images ? "images" : "imagesLove"}-${page}`
            )
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: clsx(styles.next),
            onClick: () => paginate(1),
            whileTap: { scale: 0.9 },
            whileHover: { scale: 1.1 },
            children: "▶"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: clsx(styles.prev),
            onClick: () => paginate(-1),
            whileTap: { scale: 0.9 },
            whileHover: { scale: 1.1 },
            children: "◀"
          }
        )
      ]
    }
  ) });
};
export {
  Galery as default
};
