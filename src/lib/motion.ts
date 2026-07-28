export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.65, delay, ease: easeOut },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.55, delay, ease: easeOut },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.65, delay, ease: easeOut },
});

export const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.65, delay, ease: easeOut },
});

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  viewport: { once: true, margin: "-40px" as const },
};

export const staggerItem = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
};
