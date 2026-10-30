import { motion } from 'framer-motion';
import React from 'react';
import { skillGroups } from '../../data/skillsData';
import Reveal from '../effects/reveal';
import SkillIcon from '../effects/skill-icon';
import SpotlightCard from '../effects/spotlight-card';
import SectionHeading from '../layout/section-heading';

function Skills() {
    return (
        <section id='skills' className='section'>
            <div className='container'>
                <SectionHeading index='03' eyebrow='Skills' title='Languages &' accent='tools'>
                    What I use at work every day, plus the security tools from my pentesting side.
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
                                                <SkillIcon skill={skill} size={34} />
                                            </span>
                                            <span className='skill__name'>{skill.name}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                                {group.extra && (
                                    <div className='skills__extra'>
                                        <span className='card__label'>{group.extra.label}</span>
                                        <ul>
                                            {group.extra.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
