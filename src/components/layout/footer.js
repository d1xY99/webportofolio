import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { headerData } from '../../data/headerData';
import { onAnchorClick } from '../../hooks/use-smooth-scroll';
import LocalTime from './local-time';

function Footer() {
    return (
        <footer className='footer'>
            <div className='container footer__inner'>
                <p>
                    © {new Date().getFullYear()} {headerData.name}. Designed & built with care.
                </p>
                <p className='footer__time'>
                    <span className='live-dot' /> Graz · <LocalTime />
                </p>
                <a href='#top' className='footer__top' onClick={onAnchorClick}>
                    Back to top <FiArrowUp />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
