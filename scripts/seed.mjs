import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const REVIEWS = [
  { client_name: "mohsin129", company: "United Kingdom", role: "", rating: 5, source: "Fiverr", featured: true, text: "Zeeshan is very competent in his work and his confidence put me at ease about what I wanted to achieve. He helped me automate task list reminders on Teams and Outlook. Will definitely use his skills again." },
  { client_name: "gdivergetagc", company: "United States", role: "", rating: 5, source: "Fiverr", featured: true, text: "Zeeshan was incredible. He not only created the project but then set up a Zoom call to make sure everything worked correctly." },
  { client_name: "ground_studio", company: "Thailand", role: "", rating: 5, source: "Fiverr", featured: true, text: "The final result was fantastic — the work was well done and communication was great throughout. Truly appreciated the attention to detail and problem-solving. A true professional!" },
  { client_name: "malikko1992", company: "Germany", role: "", rating: 5, source: "Fiverr", featured: true, text: "Working with Zeeshan was an absolute pleasure. He helped me fully automate certificate creation after Microsoft Teams meetings using Power Automate — clear, professional, solution-oriented from day one." },
  { client_name: "stephcruz938", company: "United States", role: "", rating: 5, source: "Fiverr", featured: true, text: "Zeeshan was easy to talk to, very professional, and timely. Grateful that Fiverr connected me with a freelancer like him. Thanks!" },
  { client_name: "mwade4", company: "United States", role: "", rating: 5, source: "Fiverr", featured: true, text: "I was struggling with a Power Automate flow at work. Zeeshan quickly built a solution matching my vision, then walked me through it live on a Zoom call until I fully understood how to manage it myself." },
];

const BLOG_POSTS = [
  {
    slug: "automate-sales-pipeline-2024",
    category: "Automation",
    title: "How to automate your entire sales pipeline in 2024",
    seo_desc: "Discover the step-by-step guide to removing manual data entry from your CRM and speeding up your sales cycle.",
    pub_date: "2024-08-12",
    read_time: "5 min read",
    featured: false,
    color: "var(--blue)",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    content: "### Sales Pipeline Automation\n\nSales pipeline automation is crucial for modern businesses..."
  },
  {
    slug: "logistics-firm-case-study",
    category: "Case Study",
    title: "How We Saved a Logistics Firm 40 Hours a Week",
    seo_desc: "A deep dive into the custom Power Automate flows we built to handle dispatch scheduling and invoice generation entirely on autopilot.",
    pub_date: "2024-09-05",
    read_time: "8 min read",
    featured: true,
    color: "var(--red)",
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    content: "### Logistics Case Study\n\nHandling logistics is no easy feat, but with automation..."
  },
  {
    slug: "sharepoint-vs-custom-apps",
    category: "Microsoft 365",
    title: "SharePoint vs. Custom Apps: Which is right for you?",
    seo_desc: "Are you outgrowing your SharePoint lists? Here is how to know when it's time to build a custom internal tool.",
    pub_date: "2024-09-22",
    read_time: "4 min read",
    featured: false,
    color: "var(--yellow)",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    content: "### SharePoint Limitations\n\nSharePoint is great for document management, but..."
  },
];

const CASE_STUDIES = [
  {
    slug: "pave-training-operations-ecosystem",
    title: "PAVE Training Operations Ecosystem",
    client_name: "waynecurry121",
    category: "Business Process Automation",
    tech_stack: "SharePoint Online, Power Automate, Microsoft Teams, JSON Formatting",
    cover_image: "/work/pave-training-hero.jpg",
    problem: "PAVE Training needed a way to manage thousands of training records internally while providing their corporate clients with a professional, secure way to view their own employees' progress and certificates. The manual process of emailing PDFs and Excel sheets was no longer scalable.",
    solution: "We built a robust infrastructure using SharePoint Online as the database and frontend engine. The \"brain\" of the operation is a private Team site where PAVE staff manages all candidate data. A master Workforce Registry flags missing NI numbers or upcoming expiries. Multi-Channel Ingestion uses Power Automate to extract data from incoming emails and populate registers. The Customer Training Portal provides clients a secure, branded view using custom JSON-formatted cards.",
    results_text: "1. Centralized Compliance with dynamic expiry alerts.\n2. Secure External Sharing using Master-to-Communication architecture.\n3. Custom-coded dashboards for real-time filtering.\n4. Reduced manual reporting.",
  },
  {
    slug: "automated-email-to-planner-task-lifecycle",
    title: "Automated Email-to-Planner Task Lifecycle",
    client_name: "Hashturn Client",
    category: "Business Process Automation",
    tech_stack: "Power Automate, Microsoft Planner, Outlook, Gemini API",
    cover_image: "/work/project2.png.jpeg",
    problem: "Teams often receive requests via email, but managing ongoing communication is a challenge. While creating an initial task from an email is simple, subsequent replies get trapped in the inbox, forcing manual copy-pasting.",
    solution: "A closed-loop Power Automate system that automatically tracks email threads and syncs new replies directly into the corresponding Planner task. It uses the Gemini API to extract AI data and safely updates tasks without overwriting manual changes.",
    results_text: "1. Single Source of Truth for task replies.\n2. AI Data Extraction converting text to actionable checklists.\n3. Eliminates manual copy-pasting.",
  },
  {
    slug: "full-lifecycle-document-synchronization-sharepoint-assembly",
    title: "SharePoint & Assembly Document Sync",
    client_name: "Hashturn Client",
    category: "API & Webhook Integration",
    tech_stack: "SharePoint, Assembly API, Power Automate, HTTP Requests",
    cover_image: "/work/project3.png.jpeg",
    problem: "Maintaining parity between a primary document repository (SharePoint) and an external project management system (like Assembly) is a constant struggle, resulting in bloated storage, orphaned files, and version control chaos.",
    solution: "A two-part Power Automate solution to ensure a perfect, automated mirror. Dedicated flows for both Create/Modify and Delete actions maintain strict database hygiene using HTTP requests.",
    results_text: "1. Two-Way Sync for creation, modification, and deletions.\n2. Perfect synchronization ensures systems remain aligned.\n3. Eliminates bloated storage and orphaned data.",
  }
];

const TEAM_MEMBERS = [
  { name: "Zeeshan Bilal", role: "Founder, CEO", image_url: "/zeeshan.jpg", linkedin_url: "https://www.linkedin.com/in/zeeshan-bilal-8911553ba/", bio: "Zeeshan Bilal is the Founder and CEO at HashTurn, leading the mission to revolutionize business processes through intelligent automation.", display_order: 1 },
  { name: "Rehana Ghaffar", role: "RPA Developer / HR", image_url: "/hr.jpg", linkedin_url: "https://l1nk.dev/imgqdh4", bio: "Rehana Ghaffar is an RPA Developer and HR Specialist at HashTurn, combining technical automation expertise with strategic talent management.", display_order: 2 },
  { name: "Muhammad Zaid Nehal", role: "Senior Software Engineer", image_url: "/zaid.jpg", linkedin_url: "https://www.linkedin.com/in/muhammad-zaid-nehal-ab0b3b223/", bio: "Focusing on high-performance development and system scalability, he specializes in translating business requirements into robust code.", display_order: 3 },
  { name: "Maaz Ahmad", role: "Automation Engineer", image_url: "/maaz.jpg", linkedin_url: "https://www.linkedin.com/in/maaz-ahmad-devs/", bio: "Maaz Ahmad is an Automation Engineer dedicated to transforming manual business processes into efficient digital workflows.", display_order: 4 },
  { name: "Qazi Zubair", role: "MERN Stack Developer", image_url: "/qazi.jpg", linkedin_url: "https://www.linkedin.com/in/qazi-zubair-928b4b243/", bio: "Specializing in building dynamic, full-stack web applications with deep expertise in MongoDB, Express, React, and Node.js.", display_order: 5 },
  { name: "Muhammad Awais Anwar", role: "Chief Technology Officer", image_url: "/awais.jpg", linkedin_url: "https://www.linkedin.com/in/awais-anwar-6b3b5521b/", bio: "Spearheading the company's technical strategy. Focused on high-performance scalable systems and cloud integrations.", display_order: 6 },
  { name: "Muhammad Irfan", role: "Web & App Developer", image_url: "/unnamed.jpg.jpeg", linkedin_url: "https://www.linkedin.com/in/irfan-khan1074/", bio: "Specializing in high-performance cross-platform solutions. He leverages clean coding practices to build scalable architectures.", display_order: 7 },
  { name: "Habibullah", role: "Full Stack Developer", image_url: "/habib.jpg", linkedin_url: "https://linkedin.com/in/habibullah-rashid", bio: "Bridging complex data systems with intuitive interfaces. Specializing in frontend aesthetics and backend architecture.", display_order: 8 },
  { name: "Iqra Ahsan", role: "Backend Developer", image_url: "/iqra.jpg.jpg", linkedin_url: "https://linkedin.com/in/iqra-ahsan-dev", bio: "Specializing in high-performance server architectures, robust APIs, and scalable databases.", display_order: 9 },
  { name: "Zohaib Rashid", role: "Junior Automation Engineer", image_url: "/zohaib.jpg", linkedin_url: "https://www.linkedin.com/in/zohaibforai/", bio: "Focused on developing efficient solutions to streamline business operations using Power Automate and Python.", display_order: 10 },
  { name: "Aqsa Wazeer", role: "Web Developer", image_url: "/aqsa.jpg.jpg", linkedin_url: "https://linkedin.com/in/aqsa-wazeer-a899b6417", bio: "Specializing in modern, high-performance web applications. Excels at turning complex designs into seamless digital experiences.", display_order: 11 },
  { name: "Hasnain Ahmad", role: "PCB & Embedded Systems", image_url: "/hasnain.jpg.png", linkedin_url: "https://l1nk.dev/pdzribp", bio: "Specializing in hardware development and circuit design across microcontrollers and IoT systems.", display_order: 12 },
  { name: "Muhammad Abubakar", role: "MERN Stack Developer", image_url: "/bkar.jpg", linkedin_url: "https://www.linkedin.com/in/muhammadabubakarmughal/", bio: "Specializing in building modern web applications, focusing on frontend architecture and responsive UI.", display_order: 13 },
  { name: "M Hassaan Sikandar", role: "Jr. Web & Automation Dev", image_url: "/hassan.jpg", linkedin_url: "https://www.linkedin.com/in/hassaan-sikandar-ab43923ba/", bio: "Combining modern web development with process automation to build smart digital solutions.", display_order: 14 }
];

async function seed() {
  console.log("Seeding Database...");
  
  // Seed Reviews
  console.log("Seeding Reviews...");
  for (const r of REVIEWS) {
    const existing = await sql`SELECT id FROM reviews WHERE name = ${r.client_name}`;
    if (existing.length === 0) {
      await sql`INSERT INTO reviews (name, location, rating, review_text, source, featured, initials) VALUES (${r.client_name}, ${r.company}, ${r.rating}, ${r.text}, ${r.source}, ${r.featured}, ${r.client_name.substring(0,2)})`;
    }
  }

  // Seed Blog Posts
  console.log("Seeding Blog Posts...");
  for (const b of BLOG_POSTS) {
    const existing = await sql`SELECT slug FROM blog_posts WHERE slug = ${b.slug}`;
    if (existing.length === 0) {
      await sql`INSERT INTO blog_posts (slug, title, description, content, hero_image, tags, pub_date) VALUES (${b.slug}, ${b.title}, ${b.seo_desc}, ${b.content}, ${b.cover_image}, ${b.category}, ${b.pub_date})`;
    }
  }

  // Seed Projects
  console.log("Seeding Projects...");
  for (const p of CASE_STUDIES) {
    const existing = await sql`SELECT slug FROM projects WHERE slug = ${p.slug}`;
    if (existing.length === 0) {
      await sql`INSERT INTO projects (slug, title, client, service, tools, hero_image, description, content, results) VALUES (${p.slug}, ${p.title}, ${p.client_name}, ${p.category}, ${p.tech_stack}, ${p.cover_image}, ${p.problem}, ${p.solution}, ${p.results_text})`;
    }
  }

  // Seed Team Members
  console.log("Seeding Team Members...");
  for (const t of TEAM_MEMBERS) {
    const existing = await sql`SELECT id FROM team_members WHERE name = ${t.name}`;
    if (existing.length === 0) {
      const id = crypto.randomUUID();
      await sql`INSERT INTO team_members (id, name, role, image, linkedin, bio, display_order) VALUES (${id}, ${t.name}, ${t.role}, ${t.image_url}, ${t.linkedin_url}, ${t.bio}, ${t.display_order})`;
    }
  }
  
  console.log("Seed Complete!");
}

seed().catch(console.error);
