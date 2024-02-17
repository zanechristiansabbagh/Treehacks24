import React from 'react';

export default function Wave() {
  return (
    <>
      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            d: path("M0,50 C150,0 350,100 500,50 L500,150 L0,150 Z");
          }
          50% {
            d: path("M0,50 C150,100 350,0 500,50 L500,150 L0,150 Z");
          }
          100% {
            d: path("M0,50 C150,0 350,100 500,50 L500,150 L0,150 Z");
          }
        }

        .wavePath {
          animation: waveAnimation 8s infinite linear;
        }
      `}</style>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{width: '100%', height: '100px'}}>
        <path fill="#0000FF" d="M0,50 C150,0 350,100 500,50 L500,150 L0,150 Z" className="wavePath"/>
      </svg>
    </>
  );
}