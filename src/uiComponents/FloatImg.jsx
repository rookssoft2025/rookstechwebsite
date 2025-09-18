import React, { useEffect, useState, useRef } from 'react';

// FloatingElement Component
const FloatingElement = ({
  children,
  amplitude = 20,
  frequency = 0.4,
  initialDelay = 300,
  floatDelay = 1000,
  enableScale = false,
  enableRotation = false,
  className = '',
  backgroundClassName = 'bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-[40%] blur-lg',
  ...props
}) => {
  const [transform, setTransform] = useState({
    y: 0,
    opacity: 0,
    scale: 0.8,
    rotation: 0
  });
  
  const animationRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    // Initial animation
    const initialTimer = setTimeout(() => {
      setTransform(prev => ({
        ...prev,
        opacity: 1,
        scale: 1
      }));
      
      setTimeout(() => {
        startTimeRef.current = Date.now();
        
        const animate = () => {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          
          const yPosition = Math.sin(elapsed * frequency * 2 * Math.PI) * amplitude;
          
          let scaleValue = 1;
          if (enableScale) {
            scaleValue = 1 + Math.sin(elapsed * frequency * 1.5 * 2 * Math.PI) * 0.05;
          }
          
          let rotationValue = 0;
          if (enableRotation) {
            rotationValue = (elapsed * 10) % 360;
          }
          
          setTransform(prev => ({
            ...prev,
            y: yPosition,
            scale: scaleValue,
            rotation: rotationValue
          }));
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
      }, floatDelay);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [amplitude, frequency, initialDelay, floatDelay, enableScale, enableRotation]);

  return (
    <div className={`relative ${className}`} {...props}>
      <div className={`absolute inset-0 ${backgroundClassName}`} />
      <div
        style={{
          transform: `translateY(${transform.y}px) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
          opacity: transform.opacity,
          transition: 'opacity 1s ease, scale 1s ease',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingElement;