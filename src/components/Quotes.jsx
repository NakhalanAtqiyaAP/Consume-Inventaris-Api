import React, { useEffect, useState } from 'react';

const MotivationalQuotes = () => {
  const quotes = [
    '"Banyak hal yang tampak mengancam dalam kegelapan menjadi menyenangkan saat kita menyinarinya."',
    '"Terkadang, cara terbaik untuk menyelesaikan masalah Kamu sendiri adalah dengan membantu orang lain."',
    '"Penting untuk mengambil hikmah dari berbagai tempat."',
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
    const fourHours = 2  * 60 * 60 * 1000;

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
    }, 2 * 60 * 60 * 1000); // 4 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className='mx-auto mt-4 max-w-md text-center text-gray-500 italic'>{quote}</p>
    </div>
  );
};

export default MotivationalQuotes;
