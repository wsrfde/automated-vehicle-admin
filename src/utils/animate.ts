const animateCSS = (
  element: string | Element,
  animation: string,
  duration = 1,
  prefix = 'animate__',
) =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    // const node =
    //   typeof element === 'string' ? document.querySelector(element) : element;
    const node =
      typeof element === 'string' ? document.querySelector(element) : element;
    node?.classList.add(`${prefix}animated`, animationName);
    node?.setAttribute('style', `--animate-duration:${duration}s`);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      event.stopPropagation();
      node?.classList.remove(`${prefix}animated`, animationName);
      node?.removeAttribute('style');
      resolve('Animation ended');
    }

    node?.addEventListener('animationend', handleAnimationEnd, {
      once: true,
    });
  });

export default animateCSS;
