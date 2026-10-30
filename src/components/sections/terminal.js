import { useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const script = [
    { cmd: 'whoami', out: ['amir_basic · full stack & systems developer'] },
    { cmd: 'cat stack.txt', out: ['TypeScript · Rust · C · C++ · Python · SQL'] },
    {
        cmd: 'nmap -sV ambition',
        out: ['PORT     STATE  SERVICE', '443/tcp  open   building-great-products', '1337/tcp open   breaking-them-safely'],
    },
];

// A fake shell session that types itself out once it scrolls into view.
function Terminal() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [step, setStep] = useState(0);
    const [typed, setTyped] = useState('');

    useEffect(() => {
        if (!inView || step >= script.length) return undefined;
        const { cmd } = script[step];

        if (typed.length < cmd.length) {
            const id = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), 45 + Math.random() * 60);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setStep(step + 1);
            setTyped('');
        }, 700);
        return () => clearTimeout(id);
    }, [inView, step, typed]);

    return (
        <div className='terminal' ref={ref}>
            <div className='terminal__bar'>
                <span />
                <span />
                <span />
                <p>amir@graz: ~</p>
            </div>
            <div className='terminal__body'>
                {script.slice(0, step).map((line) => (
                    <div key={line.cmd} className='terminal__block'>
                        <p>
                            <span className='terminal__prompt'>❯</span> {line.cmd}
                        </p>
                        {line.out.map((out) => (
                            <p key={out} className='terminal__out'>
                                {out}
                            </p>
                        ))}
                    </div>
                ))}
                <p>
                    <span className='terminal__prompt'>❯</span> {step < script.length ? typed : ''}
                    <span className='terminal__caret' />
                </p>
            </div>
        </div>
    );
}

export default Terminal;
