'use client';

import Typewriter from 'typewriter-effect';
import agents from '@/services/agents.json';
import skills from '@/services/skills.json';
import workflows from '@/services/workflows.json';


export default function Typing() {
    return (
        <Typewriter
            options={{
                strings: [`${agents.length}+ Agents`, `${skills.length}+ Skills`, `${workflows.length}+ Workflows`, 'Open Source'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
            }}
        />
    )
}