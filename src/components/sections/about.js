import React from 'react';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { aboutData } from '../../data/aboutData';
import { experienceData } from '../../data/experienceData';
import { headerData } from '../../data/headerData';
import Counter from '../effects/counter';
import Reveal from '../effects/reveal';
import ScrubText from '../effects/scrub-text';
import SpotlightCard from '../effects/spotlight-card';
import LocalTime from '../layout/local-time';
import SectionHeading from '../layout/section-heading';
import Terminal from './terminal';

function About() {
    const yearsCoding = new Date().getFullYear() - aboutData.codingSince;
    const currentJob = experienceData[0];
    const stats = [{ value: yearsCoding, suffix: '+', label: 'Years writing code' }, ...aboutData.stats];

    return (
        <section id='about' className='section'>
            <div className='container'>
                <SectionHeading index='01' eyebrow='About' title='Who' accent='I am' />

                <div className='bento'>
                    <Reveal className='bento__intro'>
                        <SpotlightCard className='card card--pad'>
                            <p className='card__kicker'>{aboutData.description1}</p>
                            <ScrubText text={aboutData.description2} className='scrub' />
                        </SpotlightCard>
                    </Reveal>

                    <Reveal className='bento__terminal' delay={0.1}>
                        <SpotlightCard className='card'>
                            <Terminal />
                        </SpotlightCard>
                    </Reveal>

                    {stats.map((stat, i) => (
                        <Reveal className='bento__stat' delay={i * 0.08} key={stat.label}>
                            <SpotlightCard className='card card--pad stat'>
                                <span className='stat__value gradient-text'>
                                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </span>
                                <span className='stat__label'>{stat.label}</span>
                            </SpotlightCard>
                        </Reveal>
                    ))}

                    <Reveal className='bento__half'>
                        <SpotlightCard className='card card--pad location'>
                            <div className='location__map' aria-hidden='true'>
                                <span className='location__pulse' />
                            </div>
                            <div>
                                <p className='card__label'>
                                    <FiMapPin /> Based in
                                </p>
                                <h3 className='card__title'>{headerData.location}</h3>
                                <p className='card__muted'>
                                    Local time <LocalTime /> · CET
                                </p>
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    <Reveal className='bento__half' delay={0.1}>
                        <SpotlightCard className='card card--pad now'>
                            <p className='card__label'>
                                <span className='live-dot' /> Currently
                            </p>
                            <h3 className='card__title'>
                                {currentJob.jobtitle} <span className='card__muted'>at</span>{' '}
                                <span className='gradient-text'>{currentJob.company}</span>
                            </h3>
                            <p className='card__muted'>
                                Since {currentJob.startYear}. Shipping end-to-end features, from database to pixel.
                            </p>
                            <FiArrowUpRight className='now__arrow' />
                        </SpotlightCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default About;
