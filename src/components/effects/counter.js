import { animate, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

function Counter({ value, prefix = '', suffix = '', duration = 2.2 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        return () => controls.stop();
    }, [inView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {display.toLocaleString('en-US')}
            {suffix}
        </span>
    );
}

export default Counter;
