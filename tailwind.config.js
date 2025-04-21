/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-blue-100',
    'bg-red-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-gray-100',
    'from-blue-600',
    'from-red-600',
    'from-green-600',
    'from-yellow-600',
    'bg-blue-700',
    'bg-red-700',
    'bg-green-700',
    'bg-yellow-700',
    'text-blue-600',
    'text-red-600',
    'text-green-600',
    'text-yellow-600',
    'bg-blue-600',
    'bg-red-600',
    'bg-green-600',
    'bg-yellow-600'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          600: '#dc2626',
          700: '#b91c1c',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          600: '#ca8a04',
          700: '#a16207',
        },
        primary: "#4F46E5",
        secondary: "#F59E0B",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'noto': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 