import React, { useEffect } from 'react';

// Fixed backdrop: dot grid, drifting aurora blobs, a pointer spotlight and film grain.
function Background() {
    useEffect(() => {
        let frame;
        const handleMove = (event) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
                document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
            });
        };
        window.addEventListener('pointermove', handleMove, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);

    return (
        <div className='bg' aria-hidden='true'>
            <div className='bg__grid' />
            <div className='bg__aurora'>
                <span className='bg__blob bg__blob--1' />
                <span className='bg__blob bg__blob--2' />
                <span className='bg__blob bg__blob--3' />
            </div>
            <div className='bg__spotlight' />
            <div className='bg__noise' />
        </div>
    );
}

export default Background;
