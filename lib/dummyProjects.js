const CEO_PROJECTS = [
  {
    id: 'proj-ceo-1',
    category: "Executive Leadership",
    title: "Global Enterprise Transformation",
    summary: "Spearheaded a multi-million dollar tech transformation across 5 global offices.",
    description: "Led the end-to-end strategic restructuring of the company's core technology infrastructure. This initiative consolidated operations, broke down data silos, and drove a 300% increase in cross-departmental efficiency within the first year.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'proj-ceo-2',
    category: "Strategic Partnerships",
    title: "Fortune 500 Joint Venture Integration",
    summary: "Successfully negotiated and integrated a massive joint venture with a top-tier Fortune 500 company.",
    description: "Orchestrated the technical and operational integration between our ecosystem and a major partner. This involved aligning executive visions, merging massive datasets securely, and establishing new industry standards for B2B collaboration.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'proj-ceo-3',
    category: "Innovation & R&D",
    title: "Launch of AI Center of Excellence",
    summary: "Founded and secured funding for an internal AI research lab driving next-gen product development.",
    description: "Recognizing the shift towards artificial intelligence, led the creation of an internal Center of Excellence. This lab now produces cutting-edge AI features embedded into all our flagship products, keeping the company at the forefront of the industry.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  }
];

export const DUMMY_PROJECTS = [
  { category: "RPA Development", title: "Enterprise Invoice Automation", keyword: "invoice,business" },
  { category: "RPA Development", title: "Legacy System Integration Pipeline", keyword: "computer,technology" },
  { category: "RPA Development", title: "Automated Onboarding Workflow", keyword: "office,people" },
  { category: "RPA Development", title: "Supply Chain Route Optimizer", keyword: "logistics,shipping" },
  { category: "RPA Development", title: "Automated Data Scraping Engine", keyword: "data,code" },
  { category: "HR Tech", title: "AI-Driven Talent Acquisition", keyword: "interview,meeting" },
  { category: "HR Tech", title: "Employee Wellness Dashboard", keyword: "health,wellness" },
  { category: "HR Tech", title: "Automated Payroll Reconciliation", keyword: "finance,money" },
  { category: "HR Tech", title: "Performance Review Automation", keyword: "chart,graph" },
  { category: "HR Tech", title: "Virtual Team Building Platform", keyword: "video,team" },
  { category: "Marketing Tech", title: "Global Technical SEO Audit", keyword: "seo,marketing" },
  { category: "Marketing Tech", title: "Automated Keyword Tracking", keyword: "typing,keyboard" },
  { category: "Marketing Tech", title: "Content Gap Analysis Tool", keyword: "writing,content" },
  { category: "Marketing Tech", title: "Dynamic Ad Spend Optimizer", keyword: "money,growth" },
  { category: "Marketing Tech", title: "Social Media Campaign Automation", keyword: "social,mobile" },
  { category: "UI/UX Design", title: "Next-Gen Dashboard Redesign", keyword: "ui,design" },
  { category: "UI/UX Design", title: "Design System 2.0", keyword: "colors,palette" },
  { category: "UI/UX Design", title: "Accessibility Compliance Revamp", keyword: "accessible,web" },
  { category: "UI/UX Design", title: "Mobile App Wireframing", keyword: "smartphone,app" },
  { category: "UI/UX Design", title: "User Journey Mapping", keyword: "map,planning" },
  { category: "Cloud Engineering", title: "AWS Infrastructure Migration", keyword: "cloud,server" },
  { category: "Cloud Engineering", title: "Kubernetes Cluster Auto-scaler", keyword: "container,tech" },
  { category: "Cloud Engineering", title: "Serverless Microservices Architecture", keyword: "architecture,network" },
  { category: "Backend Development", title: "Real-Time Data Sync API", keyword: "database,sync" },
  { category: "Backend Development", title: "High-Throughput Payment Gateway", keyword: "creditcard,payment" },
  { category: "Backend Development", title: "GraphQL Federation Layer", keyword: "graph,nodes" },
  { category: "DevSecOps", title: "Automated Security Auditing", keyword: "security,lock" },
  { category: "DevSecOps", title: "CI/CD Pipeline Revamp", keyword: "deploy,code" },
  { category: "Data Science", title: "Predictive Customer Churn Model", keyword: "analytics,predict" },
  { category: "Data Science", title: "NLP Chatbot for Support", keyword: "robot,chat" },
  { category: "Data Science", title: "Computer Vision Defect Detection", keyword: "vision,lens" },
  { category: "Web3", title: "Smart Contract Automated Audits", keyword: "crypto,chain" },
  { category: "Web3", title: "Decentralized Identity Protocol", keyword: "identity,blockchain" },
  { category: "FinTech", title: "Real-Time Fraud Detection", keyword: "fraud,alert" },
  { category: "FinTech", title: "Automated Trading Algorithm", keyword: "trading,stocks" },
  { category: "Healthcare IT", title: "Electronic Health Records Sync", keyword: "health,doctor" },
  { category: "Healthcare IT", title: "Telemedicine Video Portal", keyword: "video,medical" },
  { category: "E-Commerce", title: "Cross-Platform Inventory Synchronizer", keyword: "warehouse,boxes" },
  { category: "E-Commerce", title: "Dynamic Pricing Engine", keyword: "price,tag" },
  { category: "Legal Tech", title: "Legal Document Generator & Parser", keyword: "law,document" },
  { category: "Legal Tech", title: "Automated Contract Review", keyword: "contract,pen" },
  { category: "Manufacturing", title: "IoT Factory Floor Monitor", keyword: "factory,sensor" }
].map((proj, idx) => ({
  id: `proj-${idx + 100}`,
  category: proj.category,
  title: proj.title,
  summary: `A comprehensive solution focused on ${proj.title.toLowerCase()}, driving a 40% increase in efficiency and streamlining core operations through modern technology.`,
  description: `This project involved end-to-end development of the ${proj.title} system. The objective was to modernize the existing infrastructure and provide a scalable, highly available solution. Key responsibilities included architecture design, implementation of core logic, and rigorous automated testing. The final delivery exceeded expectations, reducing manual processing time by over 500 hours annually and setting a new standard for internal tooling.`,
  image: `https://picsum.photos/seed/${idx + 100}/800/600`,
  keyword: proj.keyword
}));

export function getUniqueProjectsForMember(member, count = 3) {
  const role = (member.role || "").toLowerCase();
  const name = (member.name || "Expert");
  
  if (role.includes('ceo') || role.includes('founder') || role.includes('chief') || name.toLowerCase().includes('ceo')) {
    return CEO_PROJECTS;
  }

  // Generate deterministic seed based on member ID
  const seedStr = String(member.id || name);
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 10000;
  }

  const generatedProjects = [];
  
  for (let i = 0; i < count; i++) {
    const curSeed = seed + i;
    
    // Base keywords based on role
    let keywords = ['Automation', 'System', 'Platform', 'Integration', 'Dashboard', 'Solution'];
    let category = "Software Engineering";
    let imgKeyword = "technology";
    
    if (role.includes('ui') || role.includes('ux') || role.includes('design')) {
      keywords = ['Interface Redesign', 'User Experience Overhaul', 'Design System', 'Accessibility Portal', 'Mobile App Wireframing'];
      category = "UI/UX Design";
      imgKeyword = "design,ui";
    } else if (role.includes('backend') || role.includes('node') || role.includes('engineer') || role.includes('cloud')) {
      keywords = ['Microservices Architecture', 'Cloud Migration', 'Data Sync API', 'High-Throughput Gateway', 'Database Federation'];
      category = "Backend & Cloud";
      imgKeyword = "server,code";
    } else if (role.includes('frontend') || role.includes('web') || role.includes('react')) {
      keywords = ['Interactive Web App', 'E-Commerce Storefront', 'Dynamic Client Portal', 'Next.js Migration', 'Component Library'];
      category = "Frontend Development";
      imgKeyword = "website,laptop";
    } else if (role.includes('rpa') || role.includes('automation')) {
      keywords = ['Invoice Processing Bot', 'Data Scraping Engine', 'Legacy System Integration', 'Workflow Automation', 'Supply Chain Optimizer'];
      category = "RPA Development";
      imgKeyword = "robot,automation";
    } else if (role.includes('marketing') || role.includes('seo') || role.includes('sales')) {
      keywords = ['SEO Audit Tool', 'Campaign Analytics Dashboard', 'Lead Generation Automation', 'Ad Spend Optimizer', 'Content Gap Analyzer'];
      category = "Marketing Tech";
      imgKeyword = "marketing,chart";
    } else if (role.includes('hr') || role.includes('human')) {
      keywords = ['Talent Acquisition Platform', 'Payroll Reconciliation Bot', 'Employee Wellness App', 'Performance Review System', 'Virtual Onboarding'];
      category = "HR Tech";
      imgKeyword = "office,people";
    }

    const titleSuffix = keywords[curSeed % keywords.length];
    const adjectives = ['Enterprise', 'Automated', 'Intelligent', 'Scalable', 'Next-Gen', 'Global', 'Real-Time', 'Dynamic'];
    const adj = adjectives[(curSeed * 2) % adjectives.length];
    
    const uniqueTitle = `${adj} ${titleSuffix}`;
    const uniqueId = `proj-dyn-${member.id}-${i}`;
    
    generatedProjects.push({
      id: uniqueId,
      category: category,
      title: uniqueTitle,
      summary: `A highly specialized ${category.toLowerCase()} solution developed by ${name}, focusing on ${titleSuffix.toLowerCase()} to drive massive business efficiency.`,
      description: `This project showcases the unique expertise of ${name} in the field of ${category}. By leveraging modern architectures and automation principles, the ${uniqueTitle} system was built from the ground up to handle massive scale. The successful deployment reduced operational overhead by 45% and set a new gold standard for internal processes.`,
      image: `https://picsum.photos/seed/${curSeed * 7 + member.id}/800/600`,
      keyword: imgKeyword
    });
  }
  
  return generatedProjects;
}

export function getProjectById(projectId) {
  if (projectId.startsWith('proj-ceo')) {
    return CEO_PROJECTS.find(p => p.id === projectId) || null;
  }
  return DUMMY_PROJECTS.find(p => p.id === projectId) || null;
}
