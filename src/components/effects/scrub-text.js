import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

function Word({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0.16, 1]);

    return (
        <span className='scrub-word'>
            <motion.span style={{ opacity }}>{children}</motion.span>{' '}
        </span>
    );
}

// Paragraph whose words light up one by one as it scrolls through the viewport.
function ScrubText({ text, className }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
    const words = text.split(' ');

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

export default ScrubText;
