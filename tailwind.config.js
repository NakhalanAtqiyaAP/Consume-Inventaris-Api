/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
        colors: {
          primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
        },
        textShadow: {
          'default': '2px 2px 4px rgba(0, 0, 0, 0.10)',
          'md': '3px 3px 6px rgba(0, 0, 0, 0.15)',
          'lg': '4px 4px 8px rgba(0, 0, 0, 0.20)',
          'blue': '2px 2px 4px rgba(0,0,255)', 
          'red': '4px 4px 4px rgba(75, 0, 130)',  
          'black': '4px 4px 4px rgba(0, 0, 0)',   
        }
        
      },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};

// Tailwind memungkinkan penggunanya untuk membuat konfigurasi 
// class nya sendiri selain dari default yang telah disediakan oleh tailwind.
// Untuk menambahkan class tersebut, dapat disimpan pada property theme → extend, 
// lalu panggil property class terkait. Pada contoh diatas, misalnya ketika nanti 
// class yang digunakan merupakan border-primary-600 maka warna yang akan tampil merupakan hex #2563eb