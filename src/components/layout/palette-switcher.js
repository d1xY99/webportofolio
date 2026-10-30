import React, { useEffect, useState } from 'react';

const palettes = [
    { id: 'copper', label: 'Copper', swatch: 'linear-gradient(135deg, #e6bd96, #c0703f)' },
    { id: 'moss', label: 'Moss', swatch: 'linear-gradient(135deg, #d8e2c2, #7f9466)' },
    { id: 'sand', label: 'Sand', swatch: 'linear-gradient(135deg, #efe3c6, #1c2533)' },
];

const STORAGE_KEY = 'portfolio-palette';

const readStored = () => {
    try {
        return window.localStorage.getItem(STORAGE_KEY) || 'copper';
    } catch (error) {
        return 'copper';
    }
};

// Lets the palettes be compared side by side while developing; not rendered in production.
function PaletteSwitcher() {
    const [palette, setPalette] = useState(readStored);

    useEffect(() => {
        if (palette === 'copper') delete document.documentElement.dataset.palette;
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
