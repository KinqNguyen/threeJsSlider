import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Slide = ({ content, style }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 80, friction: 14 },
  });

  return (
    <animated.div style={{ ...props, ...style }} className="slide">
      {content}
    </animated.div>
  );
};

export default Slide;
