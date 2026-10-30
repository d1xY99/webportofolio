import aircrack from '../assets/svg/skills/aircrack.svg'
import autopsy from '../assets/svg/skills/autopsy.svg'
import burpsuite from '../assets/svg/skills/burpsuite.svg'
import c from '../assets/svg/skills/c.svg'
import cplusplus from '../assets/svg/skills/cplusplus.svg'
import csharp from '../assets/svg/skills/csharp.svg'
import css from '../assets/svg/skills/css.svg'
import html from '../assets/svg/skills/html.svg'
import java from '../assets/svg/skills/java.svg'
import javascript from '../assets/svg/skills/javascript.svg'
import john from '../assets/svg/skills/john.svg'
import metasploit from '../assets/svg/skills/metasploit.svg'
import mysql from '../assets/svg/skills/mysql.svg'
import nikto from '../assets/svg/skills/nikto.svg'
import nmap from '../assets/svg/skills/nmap.svg'
import php from '../assets/svg/skills/php.svg'
import postgresql from '../assets/svg/skills/postgresql.svg'
import python from '../assets/svg/skills/python.svg'
import set from '../assets/svg/skills/set.svg'
import wireshark from '../assets/svg/skills/wireshark.svg'

export const skillGroups = [
    {
        id: 'languages',
        title: 'Languages',
        caption: 'What I write every day',
        skills: [
            { name: 'JavaScript', icon: javascript },
            { name: 'Python', icon: python },
            { name: 'Java', icon: java },
            { name: 'C#', icon: csharp },
            { name: 'C++', icon: cplusplus },
            { name: 'C', icon: c },
            { name: 'PHP', icon: php, mono: true },
        ],
    },
    {
        id: 'web',
        title: 'Web',
        caption: 'Interfaces that feel right',
        skills: [
            { name: 'HTML', icon: html },
            { name: 'CSS', icon: css },
        ],
    },
    {
        id: 'data',
        title: 'Databases',
        caption: 'Data modelled with care',
        skills: [
            { name: 'MySQL', icon: mysql, mono: true },
            { name: 'PostgreSQL', icon: postgresql },
        ],
    },
    {
        id: 'security',
        title: 'Security & Pentesting',
        caption: 'Breaking things to make them safer',
        skills: [
            { name: 'Metasploit', icon: metasploit },
            { name: 'Burp Suite', icon: burpsuite },
            { name: 'Nmap', icon: nmap },
            { name: 'John the Ripper', icon: john },
            { name: 'Nikto', icon: nikto },
            { name: 'Wireshark', icon: wireshark },
            { name: 'Aircrack-ng', icon: aircrack },
            { name: 'Autopsy', icon: autopsy },
            { name: 'SET', icon: set },
        ],
    },
]

export const allSkills = skillGroups.flatMap((group) => group.skills)
