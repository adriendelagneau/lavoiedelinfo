"use client"

import { IRipple, IRippleButtonProps } from '@/types';
import React, { useState, MouseEvent } from 'react';

const RippleButton: React.FC<IRippleButtonProps> = ({
  text,
  buttonClasses = '',
  onClick,
  type,
  icon,
  isLoading,
}) => {
  // State to manage ripples
  const [ripples, setRipples] = useState<IRipple[]>([]);

  // Function to add a ripple on button click
  const addRipple = (event: MouseEvent<HTMLButtonElement>) => {
    // Calculate ripple position and size
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;

    // Create a new ripple object
    const newRipple: IRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    // Update ripples state with the new ripple
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // Call onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  // Function to handle the end of ripple animation
  const handleAnimationEnd = (id: number) => {
    // Remove the finished ripple from the state
    setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
  };

  // Determine button type or default to 'button'
  const buttonType = type || 'button';

  // Render the RippleButton component
  return (
    <div className="relative">
      <button
        type={buttonType}
        className={`relative overflow-hidden hover:bg-opacity-95 ${buttonClasses}`}
        onClick={addRipple}
        disabled={isLoading}
      >
        {/* Render the icon if provided and not in loading state */}
        {icon && !isLoading && <div className="icon-container">{icon}</div>}
        {/* Render either the text or loading spinner */}
        {!isLoading ? (
          text
        ) : (
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        {/* Map over ripples and render each one */}
        {ripples.map((ripple, i) => (
          <span
            key={i}
            className="absolute rounded opacity-30 bg-slate-100"
            style={{
              left: ripple.x + 'px',
              top: ripple.y + 'px',
              width: ripple.size + 'px',
              height: ripple.size + 'px',
              transform: 'scale(0)',
              animation: 'ripple 400ms linear',
            }}
            onAnimationEnd={() => handleAnimationEnd(ripple.id)}
          ></span>
        ))}
      </button>
    </div>
  );
};

export default RippleButton;
