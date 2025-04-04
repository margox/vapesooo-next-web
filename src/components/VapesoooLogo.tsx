import React from 'react'

const VapesoooLogo: React.FC = () => {
  return (
    <div className="inline-flex items-center font-bold text-[#5291e0] perspective-600 pl-2.5 italic relative cursor-pointer">
      <span className="vapes-text relative inline-block">vapes</span>
      {/* 第一个圈（最近） */}
      <div
        className="smoke-letter relative preserve-3d ml-2 mt-4 inline-block"
        style={{ width: '28px', height: '28px', zIndex: 3, marginLeft: '3px' }}>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '15%', left: '75%', width: '3px', height: '3px' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '40%', left: '20%', width: '3px', height: '3px', animationDelay: '0.4s' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '70%', left: '60%', width: '3px', height: '3px', animationDelay: '0.8s' }}></div>
      </div>
      {/* 第二个圈（中等） */}
      <div
        className="smoke-letter relative preserve-3d ml-2 mt-4 inline-block"
        style={{ width: '38px', height: '38px', zIndex: 2, transform: 'translateZ(-25px)' }}>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '10%', left: '65%', width: '4px', height: '4px' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '50%', left: '30%', width: '4px', height: '4px', animationDelay: '0.6s' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '80%', left: '50%', width: '4px', height: '4px', animationDelay: '1s' }}></div>
      </div>
      {/* 第三个圈（最远） */}
      <div
        className="smoke-letter relative preserve-3d ml-2.5 mt-4 inline-block"
        style={{ width: '48px', height: '48px', zIndex: 1, transform: 'translateZ(-50px)', marginLeft: '11px' }}>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '5%', left: '55%', width: '5px', height: '5px' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '60%', left: '40%', width: '5px', height: '5px', animationDelay: '0.5s' }}></div>
        <div
          className="smoke-particle absolute bg-[rgba(82,145,224,0.6)] rounded-full"
          style={{ top: '90%', left: '70%', width: '5px', height: '5px', animationDelay: '1.2s' }}></div>
      </div>

      {/* Custom styles for animations and effects that can't be done with Tailwind */}
      <style jsx>{`
        .vapes-text {
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 60px;
        }

        .vapes-text:hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 100%;
          background: white;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          animation: char-scan 0.6s linear forwards;
          z-index: 10;
        }

        @keyframes char-scan {
          0% {
            left: 0;
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .smoke-letter {
          transform-style: preserve-3d;
        }

        .smoke-letter::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 5px solid;
          border-color: rgba(82, 145, 224, 0.9);
          border-radius: 50%;
          animation: smoke-pulse 4s infinite ease-in-out;
          box-sizing: border-box;
        }

        .smoke-letter:nth-child(2)::before {
          filter: blur(0);
          opacity: 1;
        }
        .smoke-letter:nth-child(3)::before {
          filter: blur(0.8px);
          opacity: 1;
        }
        .smoke-letter:nth-child(4)::before {
          filter: blur(1px);
          opacity: 1;
        }

        .smoke-letter:nth-child(2) .smoke-particle {
          filter: blur(0.3px);
        }
        .smoke-letter:nth-child(3) .smoke-particle {
          filter: blur(0.8px);
        }
        .smoke-letter:nth-child(4) .smoke-particle {
          filter: blur(1.2px);
        }

        .perspective-600 {
          perspective: 600px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes smoke-pulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.15) rotate(3deg);
          }
        }

        .smoke-particle {
          animation: smoke-dissipate 3s infinite linear;
          filter: blur(0.5px);
        }

        @keyframes smoke-dissipate {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(15px, -30px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default VapesoooLogo
