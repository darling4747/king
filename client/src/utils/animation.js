export const fadeIn = (direction = 'up', duration = 0.5, delay = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};

export const scaleUp = (duration = 0.4, delay = 0) => {
  return {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      },
    },
  };
};

export const hoverEffect = {
  scale: 1.03,
  y: -5,
  transition: { duration: 0.2, ease: 'easeInOut' }
};

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.15, ease: 'easeOut' }
};

export const buttonTap = {
  scale: 0.98
};
