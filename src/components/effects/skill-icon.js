import React from 'react';

function SkillIcon({ skill, size }) {
    if (skill.Icon) {
        const { Icon } = skill;
        return <Icon size={size} color={skill.color} aria-hidden='true' />;
    }
    if (skill.img) {
        return <img src={skill.img} alt='' width={size} height={size} />;
    }
    const initials = skill.name
        .split(/[\s.]+/)
        .map((word) => word[0])
        .join('')
        .slice(0, 2);
    return (
        <span className='skill-monogram' style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden='true'>
            {initials}
        </span>
    );
}

export default SkillIcon;
