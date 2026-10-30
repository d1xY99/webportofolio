import React, { useEffect, useState } from 'react';

const palettes = [
    { id: 'sand', label: 'Sand', swatch: 'linear-gradient(135deg, #efe3c6, #1c2533)' },
    { id: 'frost', label: 'Frost', swatch: 'linear-gradient(135deg, #d3e3f2, #10141a)' },
    { id: 'pine', label: 'Pine', swatch: 'linear-gradient(135deg, #c4e3d9, #0f1617)' },
];

const STORAGE_KEY = 'portfolio-palette';

const DEFAULT_PALETTE = palettes[0].id;

const readStored = () => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return palettes.some((item) => item.id === stored) ? stored : DEFAULT_PALETTE;
    } catch (error) {
        return DEFAULT_PALETTE;
    }
};

// Lets the palettes be compared side by side while developing; not rendered in production.
function PaletteSwitcher() {
    const [palette, setPalette] = useState(readStored);

    useEffect(() => {
        if (palette === DEFAULT_PALETTE) delete document.documentElement.dataset.palette;
        else document.documentElement.dataset.palette = palette;
        try {
            window.localStorage.setItem(STORAGE_KEY, palette);
        } catch (error) {
            // Storage can be unavailable (private mode); the switch still applies for this visit.
        }
    }, [palette]);

    return (
        <div className='palette-switcher' role='group' aria-label='Color palette'>
            {palettes.map((item) => (
                <button
                    key={item.id}
                    type='button'
                    className={palette === item.id ? 'is-active' : ''}
                    onClick={() => setPalette(item.id)}
                >
                    <span className='palette-switcher__swatch' style={{ background: item.swatch }} />
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default PaletteSwitcher;
