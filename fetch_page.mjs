import fs from 'fs';
const u = 'http://localhost:3001/work/automated-email-to-planner-task-lifecycle';
try {
  const r = await fetch(u);
  const t = await r.text();
  console.log('contains img1?', t.includes('Email-to-Planner_Flow1_Trigger.png'));
  fs.writeFileSync('page.html', t);
} catch (e) {
  console.error('fetch error', e);
  process.exit(1);
}
