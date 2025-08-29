// Animation utilities and configurations

export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// CSS classes for animations
export const animationClasses = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scaleUp: "animate-scale-up",
  hoverGlow: "hover-glow",
  parallaxBg: "parallax-bg"
};

// Intersection Observer utility for scroll animations
export const createScrollObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Common animation durations
export const animationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800
};
