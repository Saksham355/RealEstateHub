import { useEffect, useRef, useState } from 'react';

const LaserCursor = ({ isWhiteSection }) => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDot.current && cursorOutline.current) {
        cursorDot.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorOutline.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className={`cursor-dot ${isWhiteSection ? 'white-section' : ''}`} ref={cursorDot}></div>
      <div className={`cursor-outline ${isWhiteSection ? 'white-section' : ''}`} ref={cursorOutline}></div>
    </>
  );
};

export default LaserCursor;