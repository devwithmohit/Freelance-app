// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     // Add more paths if needed
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add more paths if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
