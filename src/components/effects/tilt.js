import { motion, useSpring } from 'framer-motion';
import React from 'react';

const spring = { stiffness: 180, damping: 18, mass: 0.5 };

function Tilt({ children, max = 8, className, style, ...rest }) {
    const rotateX = useSpring(0, spring);
    const rotateY = useSpring(0, spring);

    const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateY.set((px - 0.5) * max * 2);
        rotateX.set((0.5 - py) * max * 2);
        event.currentTarget.style.setProperty('--gx', `${px * 100}%`);
        event.currentTarget.style.setProperty('--gy', `${py * 100}%`);
    };

    const reset = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            className={className}
            style={{ rotateX, rotateY, transformPerspective: 1100, ...style }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export default Tilt;
