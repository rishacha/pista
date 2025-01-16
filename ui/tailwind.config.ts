// Import the Config type from Tailwind CSS
import type { Config } from 'tailwindcss';
// Import daisyUI as a module
import daisyui from 'daisyui';

// Define the Tailwind configuration using the Config type
const config: Config = {
  content: ['./src/**/*.{svelte,js,ts}'],
  plugins: [daisyui],
};

// Export the configuration as default
export default config;