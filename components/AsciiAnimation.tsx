'use client';

import { useEffect, useState } from 'react';

const AsciiAnimation = () => {
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    const CHAR = '    `~._^|\',-!:}+{=/*;[]7oc><i?)(rlt1jsIz3vCuJ%5aYn"298e0f&L6OS$VGZxTyUhP4wkDFdgqbRpmX@QAEHK#BNWM';
    const width = 50;
    const height = 20;

    const initializeGrid = () => {
      const newGrid: string[][] = [];
      for (let y = 0; y < height; y++) {
        const row: string[] = [];
        for (let x = 0; x < width; x++) {
          const randomIndex = Math.floor(Math.random() * CHAR.length);
          row.push(CHAR[randomIndex]);
        }
        newGrid.push(row);
      }
      return newGrid;
    };

    const updateGrid = (oldGrid: string[][]) => {
      const newGrid = oldGrid.map((row) => [...row]);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const currentIndex = CHAR.indexOf(oldGrid[y][x]);
          const nextIndex = (currentIndex + 1) % CHAR.length;
          newGrid[y][x] = CHAR[nextIndex];
        }
      }
      return newGrid;
    };

    setGrid(initializeGrid());
    
    const intervalId = setInterval(() => {
      setGrid((prev) => updateGrid(prev));
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <pre
        style={{
          color: '#40CFFF',
          fontFamily: 'monospace',
          fontSize: '16px',
          lineHeight: '1',
          textAlign: 'center',
          whiteSpace: 'pre',
          letterSpacing: '0.2em',
        }}
      >
        {grid.map((row, i) => (
          <div key={i}>{row.join('')}</div>
        ))}
      </pre>
    </div>
  );
};

export default AsciiAnimation;
