import { MotionConfig } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import Background from './components/effects/background';
import Cursor from './components/effects/cursor';
import Marquee from './components/effects/marquee';
import Preloader from './components/effects/preloader';
import ScrollProgress from './components/effects/scroll-progress';
import Footer from './components/layout/footer';
import Navbar from './components/layout/navbar';
import About from './components/sections/about';
import Certificates from './components/sections/certificates';
import Contact from './components/sections/contact';
import Education from './components/sections/education';
import Experience from './components/sections/experience';
import Hero from './components/sections/hero';
import Skills from './components/sections/skills';
import useSmoothScroll from './hooks/use-smooth-scroll';

function App() {
    const [ready, setReady] = useState(false);
    const handleLoaded = useCallback(() => setReady(true), []);

    useSmoothScroll();

    return (
        <MotionConfig reducedMotion='user'>
            <Preloader onDone={handleLoaded} />
            <Background />
            <Cursor />
            <ScrollProgress />
            <Navbar ready={ready} />
            <main>
                <Hero ready={ready} />
                <Marquee />
                <About />
                <Experience />
                <Skills />
                <Certificates />
                <Education />
                <Contact />
            </main>
            <Footer />
        </MotionConfig>
    );
}

export default App;
