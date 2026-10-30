import React from 'react';

// Card with a soft glow and border highlight that follow the pointer.
function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
    const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    return (
        <Tag className={`spotlight-card ${className}`} onMouseMove={handleMove} {...rest}>
            {children}
        </Tag>
    );
}

export default SpotlightCard;
