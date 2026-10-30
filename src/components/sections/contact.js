import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowUpRight, FiCheck, FiCopy, FiMapPin, FiPhone } from 'react-icons/fi';
import { contactsData } from '../../data/contactsData';
import { socialsData } from '../../data/socialsData';
import Magnetic from '../effects/magnetic';
import Reveal from '../effects/reveal';
import SpotlightCard from '../effects/spotlight-card';

function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactsData.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            window.location.href = `mailto:${contactsData.email}`;
        }
    };

    const links = [
        { href: `tel:${contactsData.phone}`, icon: <FiPhone />, label: 'Phone', value: contactsData.phone },
        { icon: <FiMapPin />, label: 'Location', value: contactsData.address },
        socialsData.linkedIn && { href: socialsData.linkedIn, icon: <FaLinkedinIn />, label: 'LinkedIn', value: 'Amir Basic', external: true },
        socialsData.github && { href: socialsData.github, icon: <FaGithub />, label: 'GitHub', value: 'd1xY99', external: true },
    ].filter(Boolean);

    return (
        <section id='contact' className='section contact'>
            <div className='contact__glow' aria-hidden='true' />
            <div className='container'>
                <Reveal className='eyebrow eyebrow--center'>
                    <span className='eyebrow__index'>06</span>
                    <span className='eyebrow__line' />
                    Contact
                </Reveal>
                <Reveal as='h2' className='contact__title' delay={0.05}>
                    Let's work <em className='serif gradient-text'>together.</em>
                </Reveal>
                <Reveal as='p' className='section-lead contact__lead' delay={0.1}>
                    Have a project, a job opening or a question? Send me an email and I'll get back to you.
                </Reveal>

                <Reveal className='contact__cta' delay={0.15}>
                    <Magnetic strength={0.2}>
                        <a href={`mailto:${contactsData.email}`} className='contact__email'>
                            {contactsData.email}
                            <FiArrowUpRight />
                        </a>
                    </Magnetic>
                    <button type='button' className='btn btn--ghost btn--small' onClick={copyEmail}>
                        <AnimatePresence mode='wait' initial={false}>
                            <motion.span
                                key={copied ? 'copied' : 'copy'}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className='copy-label'
                            >
                                {copied ? <FiCheck /> : <FiCopy />} {copied ? 'Copied!' : 'Copy email'}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </Reveal>

                <div className='contact__grid'>
                    {links.map((link, i) => {
                        const content = (
                            <>
                                <span className='contact__icon'>{link.icon}</span>
                                <span>
                                    <span className='card__label'>{link.label}</span>
                                    <span className='contact__value'>{link.value}</span>
                                </span>
                            </>
                        );
                        return (
                            <Reveal key={link.label} delay={0.1 + i * 0.06}>
                                {link.href ? (
                                    <SpotlightCard
                                        as='a'
                                        href={link.href}
                                        className='card contact__card'
                                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                    >
                                        {content}
                                    </SpotlightCard>
                                ) : (
                                    <SpotlightCard className='card contact__card'>{content}</SpotlightCard>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Contact;
