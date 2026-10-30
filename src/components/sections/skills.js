import { motion } from 'framer-motion';
import React from 'react';
import { skillGroups } from '../../data/skillsData';
import Reveal from '../effects/reveal';
import SpotlightCard from '../effects/spotlight-card';
import SectionHeading from '../layout/section-heading';

function Skills() {
    return (
        <section id='skills' className='section'>
            <div className='container'>
                <SectionHeading index='03' eyebrow='Skills' title='Languages &' accent='tools'>
                    The stack I build with, and the toolkit I use to break things before anyone else does.
                </SectionHeading>

                <div className='skills'>
                    {skillGroups.map((group, gi) => (
                        <Reveal key={group.id} className={`skills__group skills__group--${group.id}`} delay={gi * 0.08}>
                            <SpotlightCard className='card card--pad'>
                                <div className='skills__head'>
                                    <div>
                                        <h3 className='card__title'>{group.title}</h3>
                                        <p className='card__muted'>{group.caption}</p>
                                    </div>
                                    <span className='skills__count'>{String(group.skills.length).padStart(2, '0')}</span>
                                </div>
                                <motion.ul
                                    className='skills__list'
                                    initial='hidden'
                                    whileInView='show'
                                    viewport={{ once: true, margin: '-40px' }}
                                    variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
                                >
                                    {group.skills.map((skill) => (
                                        <motion.li
                                            key={skill.name}
                                            className='skill'
                                            variants={{
                                                hidden: { opacity: 0, y: 16, scale: 0.9 },
                                                show: { opacity: 1, y: 0, scale: 1 },
                                            }}
                                            whileHover={{ y: -4 }}
                                        >
                                            <span className='skill__icon'>
                                                <img src={skill.icon} alt='' className={skill.mono ? 'is-mono' : ''} />
                                            </span>
                                            <span className='skill__name'>{skill.name}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
