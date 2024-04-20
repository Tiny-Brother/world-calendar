module.exports = {
  './frontend/*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  './frontend/**/*.ts?(x)': () => 'npm run check-types',
  './frontend/*.{json,yaml}': ['prettier --write'],
};
