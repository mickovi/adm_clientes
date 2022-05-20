npm i autoprefixer postcss tailwindcss

Crear el archivo de configuracion de postcss y tailwindcss:
npx tailwindcss init -p

module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}

@tailwind base;
@tailwind components;
@tailwind utilities;

npm i react-router-dom
npm i formik yup
npm install -g json-server
json-server --watch db.json --port 4000