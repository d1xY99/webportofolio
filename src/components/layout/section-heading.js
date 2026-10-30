import React from 'react';
import Reveal from '../effects/reveal';

function SectionHeading({ index, eyebrow, title, accent, children }) {
    return (
        <div className='section-heading'>
            <Reveal className='eyebrow'>
                <span className='eyebrow__index'>{index}</span>
                <span className='eyebrow__line' />
                {eyebrow}
            </Reveal>
            <Reveal as='h2' delay={0.05} className='section-title'>
                {title} {accent && <em className='serif gradient-text'>{accent}</em>}
            </Reveal>
            {children && (
                <Reveal as='p' delay={0.1} className='section-lead'>
                    {children}
                </Reveal>
            )}
        </div>
    );
}

export default SectionHeading;
