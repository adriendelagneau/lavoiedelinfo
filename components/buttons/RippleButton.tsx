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
  const [ripples, setRipples] = useState<IRipple[]>([]);

  const addRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;

    const newRipple: IRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    if (onClick) {
      onClick(event);
    }
  };

  const handleAnimationEnd = (id: number) => {
    setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
  };

  const buttonType = type || 'button';

  return (
    <div className="relative">
      <button
        type={buttonType}
        className={`relative overflow-hidden  hover:bg-opacity-95  ${buttonClasses}`}
        onClick={addRipple}
        disabled={isLoading}
      >
        {icon && !isLoading && <div className="icon-container">{icon}</div>}
        {!isLoading ? (
          text
        ) : (
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full opacity-30 bg-slate-100"
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
