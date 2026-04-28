import React, { useRef } from "react";

function InteractiveCard({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation
    const rotateX = Math.max(Math.min(-(y - rect.height / 2) / 15, 10), -10); // clamp between -10 and 10
    const rotateY = Math.max(Math.min((x - rect.width / 2) / 15, 10), -10);

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
    ref.current.style.boxShadow = `0 15px 35px rgba(0,0,0,0.2)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
      ref.current.style.boxShadow = `0 5px 15px rgba(0,0,0,0.1)`;
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 will-change-transform rounded-2xl"
      style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
    >
      {children}
    </div>
  );
}

export default InteractiveCard;