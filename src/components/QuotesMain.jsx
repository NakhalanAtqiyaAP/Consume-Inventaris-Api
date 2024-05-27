import React, { useEffect, useState } from 'react';

const MotivationalQuotes = () => {
  const quotes = [
    '"Berjuanglah bukan untuk sukses, tetapi lebih baik menjadi bernilai."',
    '"Hidup itu seperti sepeda, untuk menjaga keseimbangan kamu harus terus melaju."',
    '"Dunia adalah tempat yang berbahaya untuk hidup, bukan karena orang-orang yang jahat, tetapi karena orang-orang yang tidak melakukan apa-apa tentangnya."',
    '"Inilah saatnya bagi Kamu untuk melihat ke dalam dan mulai bertanya pada diri sendiri pertanyaan besar: Siapa Kamu, dan apa yang Kamu inginkan?"',
    '"Ketika kamu menyelesaikan sesuatu, itu bukanlah akhir dari sesuatu, itu adalah awal dari yang baru"',
    '"Belajar dari kemarin, hidup untuk hari ini, berharap untuk besok. Yang penting adalah tidak berhenti bertanya."',
    '"Berjuanglah bukan untuk sukses, tetapi lebih baik menjadi bernilai."',
    '"Satunya-satunya cara untuk melarikan diri dari efek yang dapat dirusak oleh pujian adalah terus bekerja."'
  ];

  const getNewQuoteIndex = (currentIndex) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex);
    return newIndex;
  };

  const getQuote = () => {
    const savedTimestamp = localStorage.getItem('quoteTimestamp');
    const savedIndex = localStorage.getItem('quoteIndex');
    const currentTime = new Date().getTime();
    const fourHours = 1  * 60 * 60 * 1000;

    let quoteIndex;
    if (savedTimestamp && savedIndex && currentTime - savedTimestamp < fourHours) {
      quoteIndex = parseInt(savedIndex, 10);
    } else {
      quoteIndex = getNewQuoteIndex(parseInt(savedIndex, 10));
      localStorage.setItem('quoteTimestamp', currentTime);
      localStorage.setItem('quoteIndex', quoteIndex);
    }

    return quotes[quoteIndex];
  };

  const [quote, setQuote] = useState(getQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getQuote());
    }, 1 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        <section className="bg-gray-700 ">
  <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      <div className="relative z-10 lg:py-5">
        <div className="relative h-64 sm:h-80 lg:h-full">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative flex items-center bg-gray-300">
        <span
          className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-300"
        ></span>

        <div className="p-8 sm:p-16 lg:p-24">
          
        <blockquote className="text-2xl italic font-semibold text-gray-900 dark:text-white">
    <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <h1 className='text-gray-600'>{quote}</h1>
    <p className='mt-2 flex justify-end text-gray-700'>-Albert Einsten</p>
</blockquote>
          
          
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default MotivationalQuotes;
