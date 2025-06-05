'use client'

import { useEffect, useState } from 'react';
import Footer from './Footer';

export default function ScrollAwareFooter() {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const bottomReached = scrollTop + clientHeight >= scrollHeight - 5;
      const topReached = scrollTop <= 5;

      setShowFooter(topReached || bottomReached);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // para definir o estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Footer show={showFooter} />;
}
