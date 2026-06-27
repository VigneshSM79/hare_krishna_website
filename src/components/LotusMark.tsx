import React from 'react';

// Small line-art lotus mark — never an emoji, never inside a gradient circle.
const LotusMark = ({ size = 30, color = '#CD6A2B' }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M16 27c-6 0-11-3.4-11-7.6 0 0 4 .6 6.6 2.4" />
    <path d="M16 27c6 0 11-3.4 11-7.6 0 0-4 .6-6.6 2.4" />
    <path d="M16 27c-3.2-2-5-5-5-8.7 0-1.4.3-2.7.8-3.8C13 16 14.4 18 16 19.4" />
    <path d="M16 27c3.2-2 5-5 5-8.7 0-1.4-.3-2.7-.8-3.8C19 16 17.6 18 16 19.4" />
    <path d="M16 26c0-5 0-10 0-19 1.8 2.6 3 6 3 9.5 0 3.8-1.2 7-3 9.5z" />
  </svg>
);

export default LotusMark;
