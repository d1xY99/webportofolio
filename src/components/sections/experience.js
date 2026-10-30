import { motion, useScroll, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
import { experienceData } from '../../data/experienceData';
import Reveal from '../effects/reveal';
import SpotlightCard from '../effects/spotlight-card';
import SectionHeading from '../layout/section-heading';

export function Timeline({ items }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <div className='timeline' ref={ref}>
            <div className='timeline__track'>
                <motion.div className='timeline__beam' style={{ scaleY }} />
            </div>
            {items.map((item, i) => (
                <Reveal className='timeline__item' key={item.id} delay={0.05}>
                    <span className={`timeline__node ${item.current ? 'is-current' : ''}`} />
                    <SpotlightCard className='card card--pad xp'>
                        <div className='xp__meta'>
                            <span className='xp__period'>{item.period}</span>
                            {item.current && (
                                <span className='tag tag--live'>
                                    <span className='live-dot' /> Current
                                </span>
                            )}
                        </div>
                        <h3 className='xp__title'>{item.title}</h3>
                        <p className='xp__org'>{item.org}</p>
                        {item.description && <p className='xp__desc'>{item.description}</p>}
                        <span className='xp__index' aria-hidden='true'>
                            {String(i + 1).padStart(2, '0')}
                        </span>
                    </SpotlightCard>
                </Reveal>
            ))}
        </div>
    );
}

function Experience() {
    const items = experienceData.map((job) => ({
        id: job.id,
        title: job.jobtitle,
        org: job.company,
        period: `${job.startYear} — ${job.endYear}`,
        current: job.endYear === 'Present',
        description: job.description,
    }));

    return (
        <section id='experience' className='section'>
            <div className='container container--narrow'>
                <SectionHeading index='02' eyebrow='Experience' title="Where I've" accent='worked'>
                    From front-end beginnings to full stack products and security work.
                </SectionHeading>
                <Timeline items={items} />
            </div>
        </section>
    );
}

export default Experience;
