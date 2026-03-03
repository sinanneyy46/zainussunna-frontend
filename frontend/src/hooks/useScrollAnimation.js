import { useState, useEffect, useRef } from "react";

/**
 * Hook for triggering animations when element enters viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {number} options.triggerOnce - Whether to trigger animation only once
 * @returns [ref, isVisible]
 */
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.2, triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce]);

  // Toggle is-visible class on the element
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isVisible) {
      element.classList.add("is-visible");
    } else {
      element.classList.remove("is-visible");
    }
  }, [isVisible]);

  return [ref, isVisible];
};

export default useScrollAnimation;
