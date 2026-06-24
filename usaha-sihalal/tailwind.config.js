export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 30px 80px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(236, 253, 245, 0.9), transparent 45%), linear-gradient(180deg, rgba(255,255,255,0.95), rgba(224, 242, 254, 0.8))',
      },
    },
  },
  plugins: [],
};
