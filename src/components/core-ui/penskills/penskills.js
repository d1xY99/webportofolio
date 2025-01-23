import React, { useContext } from 'react';
import Marquee from 'react-fast-marquee';
import { ThemeContext } from '../../../contexts/theme-context';
import { penskillsData } from '../../../data/penskillsData';
import { skillsImage } from '../../../utils/skillsImage';
import './penskills.css';

function PenSkills() {
    const { theme } = useContext(ThemeContext);

    const skillBoxStyle = {
        backgroundColor: theme.secondary,
        boxShadow: `0px 0px 12px ${theme.primary}`
    }

    return (
        <div className="penskills" style={{ backgroundColor: theme.secondary }}>
            <div className="penskillsHeader">
                <h2 style={{ color: theme.primary }}>Penetration Testing Skills</h2>
            </div>
            <div className="penskillsContainer">
                <div className="penskill--scroll">
                    <Marquee
                        gradient={false}
                        speed={80}
                        pauseOnHover={true}
                        pauseOnClick={true}
                        delay={0}
                        play={true}
                        direction="left"
                    >
                        {penskillsData.map((skill, id) => (
                            <div className="penskill--box" key={id} style={skillBoxStyle}>
                                <img src={skillsImage(skill)} alt={skill} />
                                <h3 style={{ color: theme.tertiary }}>
                                    {skill}
                                </h3>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default PenSkills;
