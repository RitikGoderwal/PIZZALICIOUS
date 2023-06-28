import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const [showFooter, setShowFooter] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition + windowHeight >= fullHeight) {
        setShowFooter(true);
        setShowScroll(true);
      } else {
        setShowFooter(false);
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`footer ${showFooter ? 'show-footer' : ''}`}>
      <div className="social-icons">
        <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
</div>
<p className='end'>Copyright © 2023 PizzaLicious, Inc.</p>
{showScroll && (
<button className="scroll-to-top" onClick={handleScrollToTop}>
<FontAwesomeIcon icon={faArrowUp} />
<span>Back to Top</span>
</button>
)}
</footer>
);
}

export default Footer;
