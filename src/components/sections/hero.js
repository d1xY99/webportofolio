import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowDown, FiArrowRight, FiMail, FiMapPin, FiShield } from 'react-icons/fi';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';
import { onAnchorClick } from '../../hooks/use-smooth-scroll';
import Magnetic from '../effects/magnetic';
import Tilt from '../effects/tilt';

const ease = [0.16, 1, 0.3, 1];

function SplitWord({ text, delay, ready, className }) {
    return (
        <span className={`split-word ${className || ''}`} aria-label={text}>
            {text.split('').map((char, i) => (
                <span className='split-word__mask' key={i} aria-hidden='true'>
                    <motion.span
                        initial={{ y: '110%' }}
                        animate={ready ? { y: '0%' } : undefined}
                        transition={{ duration: 1.1, delay: delay + i * 0.05, ease }}
                    >
                        {char}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

function RoleRotator({ roles }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
        return () => clearInterval(id);
    }, [roles.length]);

    return (
        <span className='role-rotator'>
            <AnimatePresence mode='wait'>
                <motion.span
                    key={roles[index]}
                    className='gradient-text'
                    initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55, ease }}
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function Hero({ ready }) {
    const { scrollY } = useScroll();
    const contentY = useTransform(scrollY, [0, 700], [0, -120]);
    const visualY = useTransform(scrollY, [0, 700], [0, -60]);
    const fade = useTransform(scrollY, [0, 500], [1, 0]);

    const fadeUp = (delay) => ({
        initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
        animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
        transition: { duration: 1, delay, ease },
    });

    return (
        <section id='top' className='hero'>
            <div className='container hero__inner'>
                <motion.div className='hero__content' style={{ y: contentY, opacity: fade }}>
                    <motion.a href='#experience' className='badge' onClick={onAnchorClick} {...fadeUp(0.1)}>
                        <span className='live-dot' />
                        {headerData.currentRole}
                        <FiArrowRight />
                    </motion.a>

                    <h1 className='hero__title'>
                        <SplitWord text={headerData.firstName} delay={0.15} ready={ready} />
                        <SplitWord text={headerData.lastName} delay={0.35} ready={ready} className='serif gradient-text' />
                    </h1>

                    <motion.p className='hero__role' {...fadeUp(0.6)}>
                        <span className='hero__role-line' />
                        <RoleRotator roles={headerData.roles} />
                    </motion.p>

                    <motion.p className='hero__desc' {...fadeUp(0.7)}>
                        {headerData.description}
                    </motion.p>

                    <motion.div className='hero__actions' {...fadeUp(0.8)}>
                        <Magnetic>
                            <a href='#contact' className='btn btn--primary' onClick={onAnchorClick}>
                                Get in touch <FiArrowRight />
                            </a>
                        </Magnetic>
                    </motion.div>

                    <motion.div className='hero__socials' {...fadeUp(0.9)}>
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                                <FaLinkedinIn />
                            </a>
                        )}
                        {socialsData.github && (
                            <a href={socialsData.github} target='_blank' rel='noreferrer' aria-label='GitHub'>
                                <FaGithub />
                            </a>
                        )}
                        {socialsData.mail && (
                            <a href={`mailto:${socialsData.mail}`} aria-label='Email'>
                                <FiMail />
                            </a>
                        )}
                    </motion.div>
                </motion.div>

                <motion.div
                    className='hero__visual'
                    style={{ y: visualY }}
                    initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px)' }}
                    animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
                    transition={{ duration: 1.4, delay: 0.3, ease }}
                >
                    <Tilt className='portrait' max={7}>
                        <div className='portrait__ring' />
                        <div className='portrait__frame'>
                            <img src={headerData.image} alt={headerData.name} />
                            <div className='portrait__shade' />
                        </div>
                    </Tilt>

                    <motion.div
                        className='float-chip float-chip--location'
                        initial={{ opacity: 0, x: -20 }}
                        animate={ready ? { opacity: 1, x: 0 } : undefined}
                        transition={{ duration: 0.9, delay: 1, ease }}
                    >
                        <FiMapPin /> {headerData.location}
                    </motion.div>
                    <motion.div
                        className='float-chip float-chip--thm'
                        initial={{ opacity: 0, x: 20 }}
                        animate={ready ? { opacity: 1, x: 0 } : undefined}
                        transition={{ duration: 0.9, delay: 1.15, ease }}
                    >
                        <FiShield /> TryHackMe · Top 4 in Austria
                    </motion.div>
                    <motion.div
                        className='float-chip float-chip--code'
                        initial={{ opacity: 0, y: 20 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.9, delay: 1.3, ease }}
                    >
                        <span className='code-token code-token--tag'>&lt;</span>
                        FullStack
                        <span className='code-token code-token--attr'> secure</span>
                        <span className='code-token code-token--tag'> /&gt;</span>
                    </motion.div>
                </motion.div>
            </div>

            <motion.a
                href='#about'
                className='scroll-cue'
                onClick={onAnchorClick}
                style={{ opacity: fade }}
            >
                <span>Scroll</span>
                <FiArrowDown />
            </motion.a>
        </section>
    );
}

export default Hero;
