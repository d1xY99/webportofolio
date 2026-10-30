import { motion } from 'framer-motion';
import React from 'react';

export const easeOutExpo = [0.16, 1, 0.3, 1];

function Reveal({ as = 'div', children, delay = 0, y = 28, className, ...rest }) {
    const Component = motion[as];

    return (
        <Component
            className={className}
            initial={{ opacity: 0, y, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay, ease: easeOutExpo }}
            {...rest}
        >
            {children}
        </Component>
    );
}

export default Reveal;
