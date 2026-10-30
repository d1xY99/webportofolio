import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiArrowUpRight, FiAward, FiX } from 'react-icons/fi';
import { certificateData } from '../../data/certificate-data';
import { lockScroll } from '../../hooks/use-smooth-scroll';
import Reveal from '../effects/reveal';
import Tilt from '../effects/tilt';
import SectionHeading from '../layout/section-heading';

function Lightbox({ cert, onClose }) {
    useEffect(() => {
        lockScroll(true);
        const handleKey = (event) => event.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKey);
        return () => {
            lockScroll(false);
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <motion.div
            className='lightbox'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role='dialog'
            aria-modal='true'
            aria-label={cert.title}
        >
            <motion.figure
                className='lightbox__figure'
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
            >
                <img src={cert.image} alt={cert.title} />
                <figcaption>
                    <div>
                        <h3>{cert.title}</h3>
                        <p>
                            {cert.issuer} · {cert.year}
                        </p>
                    </div>
                    <div className='lightbox__actions'>
                        {cert.link && (
                            <a href={cert.link} target='_blank' rel='noreferrer' className='btn btn--ghost btn--small'>
                                Open original <FiArrowUpRight />
                            </a>
                        )}
                        <button type='button' className='lightbox__close' onClick={onClose} aria-label='Close'>
                            <FiX />
                        </button>
                    </div>
                </figcaption>
            </motion.figure>
        </motion.div>
    );
}

function Certificates() {
    const [selected, setSelected] = useState(null);
    const close = React.useCallback(() => setSelected(null), []);

    return (
        <section id='certificates' className='section'>
            <div className='container'>
                <SectionHeading index='04' eyebrow='Certificates' title='Proof of' accent='practice'>
                    Learning paths, hackathons and skill assessments I've completed along the way.
                </SectionHeading>

                <div className='certs'>
                    {certificateData.map((cert, i) => (
                        <Reveal key={cert.id} delay={(i % 3) * 0.08} className='certs__item'>
                            <Tilt className='cert' max={6}>
                                <button
                                    type='button'
                                    className='cert__button'
                                    onClick={() => setSelected(cert)}
                                    data-cursor='View'
                                    aria-label={`View ${cert.title} certificate`}
                                >
                                    <div className='cert__media'>
                                        <img src={cert.image} alt='' loading='lazy' />
                                    </div>
                                    <div className='cert__body'>
                                        <span className='cert__icon'>
                                            <FiAward />
                                        </span>
                                        <div>
                                            <h3>{cert.title}</h3>
                                            <p>
                                                {cert.issuer} · {cert.year}
                                            </p>
                                        </div>
                                        <FiArrowUpRight className='cert__arrow' />
                                    </div>
                                    <span className='cert__glare' />
                                </button>
                            </Tilt>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>{selected && <Lightbox cert={selected} onClose={close} />}</AnimatePresence>
        </section>
    );
}

export default Certificates;
