'use client';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './SpinWheel.module.css';

const prizes = ['10% Off', 'Free Shipping', '5% Cashback', 'Try Again', 'Surprise Gift', '20% Discount'];

export default function SpinWheel() {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const { speak } = useSpeechSynthesis();
  const { transcript, resetTranscript } = useSpeechRecognition();

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const sliceAngle = 360 / prizes.length;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const targetAngle = sliceAngle * randomIndex + sliceAngle / 2;
    const finalRotation = 360 * 5 + (180 - targetAngle);

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }

    setTimeout(() => {
      const winningPrize = prizes[randomIndex];
      setResult(winningPrize);
      speak({ text: `You won ${winningPrize}` });
      setSpinning(false);
    }, 4000);
  };

  useEffect(() => {
    if (transcript.toLowerCase().includes('start')) {
      spin();
      resetTranscript();
    }
  }, [transcript]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="wheel-container">
        <div className="wheel" ref={wheelRef}>
          {prizes.map((prize, index) => (
            <div key={index} className="slice"
              style={{
                transform: `rotate(${(360 / prizes.length) * index}deg) skewY(-30deg)`,
                background: index % 2 === 0 ? '#93c5fd' : '#bfdbfe'
              }}>
              <span>{prize}</span>
            </div>
          ))}
        </div>
        <div className="arrow" />
      </div>
      <button onClick={spin} className="bg-indigo-600 text-white px-6 py-2 rounded-full">Spin the Wheel</button>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })} className="text-sm text-indigo-800 underline">
        Start Voice Listening
      </button>
      {result && <p className="text-lg mt-2 font-semibold">🎉 You won: {result}</p>}
    </div>
  );
}
