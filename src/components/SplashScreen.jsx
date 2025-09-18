import React, { useEffect, useRef, useState } from "react";
const logo = "/lOGO@3x.png";

const SplashScreen = ({ duration = 1500, children }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(0, 180, 255, ${Math.random() * 0.5})`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 100;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(0, 180, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 1;
      });
    }, duration / 100);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setDone(true), 1000); 
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <div className="relative w-full h-full">
      {children}
      {!done && (
        <div
          className={`fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 overflow-hidden transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl bg-gray-900 bg-opacity-80 border border-blue-500 border-opacity-30 shadow-2xl">
            <div className="absolute -inset-2 bg-blue-400 rounded-3xl opacity-40 blur-lg"></div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative ">
                <div className="absolute -inset-4 bg-blue-500 rounded-full opacity-50 blur-lg"></div>
                <img
                  src={logo}
                  alt="Company logo"
                  className="relative h-28 w-28 object-contain z-10"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(0, 180, 255, 0.8))",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute flex gap-10 bottom-8 left-8 z-20">
            <div className="w-[300px]">
              <div
                className="text-blue-200 text-9xl font-bold tracking-widest"
                style={{ textShadow: "0 0 10px rgba(0, 180, 255, 0.8)" }}
              >
                {progress}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
