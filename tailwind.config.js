/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./public/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    animation:{
      ping : 'ping 1s cubic-bezier(0,0,0.2,1) '
    },
    keyframes:{
      ping:{
        "transform": "scale(2)",
        "opacity": "0",
      }
    }
  },
};
export const plugins = [];

