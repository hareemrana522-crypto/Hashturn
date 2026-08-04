import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

const UPDATED_BIOS = [
  { name: 'Zeeshan Bilal',       bio: 'Founder & CEO at HashTurn, driving the mission to automate business processes.' },
  { name: 'Rehana Ghaffar',      bio: 'RPA Developer & HR Specialist at HashTurn, blending automation skills with talent management.' },
  { name: 'Muhammad Zaid Nehal', bio: 'Specializes in high-performance development, translating business needs into robust code.' },
  { name: 'Maaz Ahmad',          bio: 'Automation Engineer transforming manual processes into efficient digital workflows.' },
  { name: 'Qazi Zubair',         bio: 'Full-stack developer with expertise in MongoDB, Express, React, and Node.js.' },
  { name: 'Muhammad Awais Anwar',bio: 'CTO driving technical strategy, focused on scalable systems and cloud integrations.' },
  { name: 'Muhammad Irfan',      bio: 'Builds cross-platform solutions using clean code practices and scalable architectures.' },
  { name: 'Habibullah',          bio: 'Bridges data systems with intuitive interfaces, excelling in frontend and backend.' },
  { name: 'Iqra Ahsan',          bio: 'Builds high-performance APIs, server architectures, and scalable databases.' },
  { name: 'Zohaib Rashid',       bio: 'Develops automation solutions using Power Automate and Python to streamline operations.' },
  { name: 'Aqsa Wazeer',         bio: 'Builds modern web applications, turning complex designs into seamless experiences.' },
  { name: 'Hasnain Ahmad',       bio: 'Specializes in PCB design and embedded systems for microcontrollers and IoT.' },
  { name: 'Muhammad Abubakar',   bio: 'Builds modern web applications focused on frontend architecture and responsive UI.' },
  { name: 'M Hassaan Sikandar',  bio: 'Combines web development with automation to build efficient digital solutions.' },
];

export async function GET() {
  try {
    for (const m of UPDATED_BIOS) {
      await sql`UPDATE team_members SET bio = ${m.bio} WHERE name = ${m.name}`;
    }
    return NextResponse.json({ ok: true, updated: UPDATED_BIOS.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
