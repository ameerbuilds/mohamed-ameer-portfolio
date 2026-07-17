/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Main Background
        ink: '#0F172A',

        // Cards & Sections
        panel: '#1E293B',

        // Borders
        line: '#334155',

        // Secondary Text
        muted: '#CBD5E1',

        // Light Border
        faint: '#475569',

        // Primary Color (Buttons & Highlights)
        acid: '#3B82F6',

        // Hover Color
        coral: '#60A5FA',

        // Main Text
        bone: '#F8FAFC',
      },

      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },

      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at top, rgba(59,130,246,0.20), transparent 70%)',
      },
    },
  },
  plugins: [],
};