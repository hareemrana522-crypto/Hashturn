const { neon } = require('@neondatabase/serverless');

async function seed() {
  const url = process.env.DATABASE_URL;
  const sql = neon(url);
  try {
    const projects = [
      {
        slug: 'enterprise-automation-solution',
        title: 'Enterprise Automation Solution',
        description: 'Automated 80% of manual data entry workflows for a leading enterprise client.',
        service: 'Business Process Automation',
        client: 'TechCorp Enterprise',
        tools: 'Power Automate, SharePoint, Python',
        hero_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        results: 'Reduced manual effort by 80%\nSaved $500k annually',
        content: 'We implemented a comprehensive automation strategy to streamline their daily operations...',
        display_order: 1
      },
      {
        slug: 'ai-powered-analytics-dashboard',
        title: 'AI-Powered Analytics Dashboard',
        description: 'Built a real-time analytics dashboard with predictive AI models.',
        service: 'API & Integration Services',
        client: 'DataFlow Inc',
        tools: 'Next.js, Tailwind, OpenAI API',
        hero_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        results: 'Increased insights delivery speed by 200%\nBoosted sales conversions by 15%',
        content: 'By integrating advanced AI models, we provided the client with predictive capabilities...',
        display_order: 2
      },
      {
        slug: 'legacy-system-modernization',
        title: 'Legacy System Modernization',
        description: 'Migrated a 10-year old monolith into a scalable microservices architecture.',
        service: 'Web Development',
        client: 'Global Logistics Solutions',
        tools: 'React, Node.js, PostgreSQL',
        hero_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        results: '99.99% Uptime achieved\nPage load speed improved by 3x',
        content: 'The old system was bottlenecking their growth. We carefully migrated all data and endpoints...',
        display_order: 3
      }
    ];

    for (const p of projects) {
      await sql`
        INSERT INTO projects (
          slug, title, description, service, client, tools, hero_image, results, content, display_order
        ) VALUES (
          ${p.slug}, ${p.title}, ${p.description}, ${p.service}, ${p.client}, ${p.tools}, ${p.hero_image}, ${p.results}, ${p.content}, ${p.display_order}
        )
      `;
      console.log(`Inserted ${p.title}`);
    }
    console.log("Seed complete.");
  } catch (e) {
    console.error("Error:", e);
  }
}
seed();
