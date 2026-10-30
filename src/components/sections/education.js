import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { educationData } from '../../data/educationData';
import Reveal from '../effects/reveal';
import SpotlightCard from '../effects/spotlight-card';
import SectionHeading from '../layout/section-heading';

function Education() {
    return (
        <section id='education' className='section'>
            <div className='container'>
                <SectionHeading index='05' eyebrow='Education' title='Where I' accent='learned' />

                <div className='edu'>
                    {educationData.map((item, i) => (
                        <Reveal key={item.id} delay={i * 0.08}>
                            <SpotlightCard className='card card--pad edu__card'>
                                <div className='edu__top'>
                                    <span className='edu__icon'>
                                        <FiBookOpen />
                                    </span>
                                    <span className='xp__period'>
                                        {item.startYear} — {item.endYear}
                                    </span>
                                </div>
                                <p className='card__label'>{item.course}</p>
                                <h3 className='card__title'>{item.institution}</h3>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
