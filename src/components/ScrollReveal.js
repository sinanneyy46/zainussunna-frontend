import { useEffect, useRef } from "react";

/**
 * ScrollReveal wrapper component
 * Wraps children and adds 'is-visible' class when element enters viewport
 */
const ScrollReveal = ({
  children,
  threshold = 0.2,
  triggerOnce = true,
  className = "",
  as: Component = "div",
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          element.classList.remove("is-visible");
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

  return (
    <Component ref={ref} data-reveal className={className} {...props}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
