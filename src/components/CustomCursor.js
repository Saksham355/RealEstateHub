import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create ripple effect
      const rippleContainer = document.querySelector('.ripple-effect');
      if (rippleContainer) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${e.pageX}px`;
        ripple.style.top = `${e.pageY}px`;
        rippleContainer.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="cursor-outline" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div className="ripple-effect" />
    </>
  );
};

export default CustomCursor;