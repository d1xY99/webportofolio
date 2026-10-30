import React from 'react';
import { allSkills } from '../../data/skillsData';

function Row({ items, reverse }) {
    // Rendered twice so the CSS translate loop is seamless.
    const loop = [...items, ...items];

    return (
        <div className={`marquee__row ${reverse ? 'marquee__row--reverse' : ''}`}>
            {loop.map((skill, i) => (
                <span className='marquee__item' key={`${skill.name}-${i}`} aria-hidden={i >= items.length}>
                    <img src={skill.icon} alt='' className={skill.mono ? 'is-mono' : ''} />
                    {skill.name}
                    <span className='marquee__sep'>✦</span>
                </span>
            ))}
        </div>
    );
}

function Marquee() {
    const half = Math.ceil(allSkills.length / 2);

    return (
        <section className='marquee' aria-label='Technologies'>
            <Row items={allSkills.slice(0, half)} />
            <Row items={allSkills.slice(half)} reverse />
        </section>
    );
}

export default Marquee;
