import { sql } from '../lib/db.js';

const emailPlannerContent = `
# Automated Email-to-Planner Task Lifecycle

> "This automation completely eliminated the friction of managing ongoing email requests. No more copy-pasting replies into Planner tasks manually!"
> — **Project Lead, Hashturn Client**

### The Challenge
Teams often receive support requests and project updates via email, but managing ongoing communication is a significant challenge. While creating an initial task from a new email is simple, subsequent replies get trapped in individual inboxes, forcing the team to manually copy-paste updates into Microsoft Planner to keep everyone in the loop.

### Our Solution
We built a closed-loop **Power Automate** system that automatically tracks email threads and syncs new replies directly into the corresponding Planner task.

#### 1. Intelligent Trigger System
A master flow acts as the listener, intercepting relevant emails and identifying if they belong to an existing thread or require a new Planner task.

#### 2. AI-Powered Data Extraction
Using the **Gemini API**, the automation extracts critical action items and summarizes the email thread, ensuring that the Planner task contains a concise overview of the request.

#### 3. Safe ETag Injection
To prevent the automation from accidentally overwriting manual changes made by team members inside Planner, we implemented an ETag sync mechanism. This ensures that only new information is appended safely.

### Technical Highlight & Workflow
The solution is divided into three highly optimized flows to handle scale and prevent throttling:
<img src="/work/Email-to-Planner_Flow1_Trigger.png" alt="Email Trigger Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
<img src="/work/Email-to-Planner_Flow2_Companion.png" alt="Companion Processing Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
<img src="/work/Email-to-Planner_Flow3_ETagInject.png" alt="ETag Injection Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
`;

const assemblySyncContent = `
# SharePoint & Assembly Document Sync

> "We finally have a single source of truth for our files. The automated mirror between SharePoint and Assembly has completely resolved our version control chaos."
> — **Operations Director, Hashturn Client**

### The Challenge
Maintaining parity between a primary document repository (SharePoint) and an external project management system (like Assembly) is a constant struggle. Without automation, the team faced bloated storage, orphaned files, and severe version control chaos, as users uploaded different versions to different platforms.

### Our Solution
We developed a two-part **Power Automate** solution to ensure a perfect, automated mirror between both platforms, using advanced HTTP requests to manipulate the external API.

#### 1. The Creation & Modification Engine
Whenever a new document is added to SharePoint, or an existing one is updated, a dedicated flow intercepts the event. It captures the file metadata and pushes the exact version to Assembly, ensuring the project management tool always reflects the latest state.

#### 2. Automated Deletion & Database Hygiene
When a file is deleted in SharePoint, it must not linger as an "orphaned file" in Assembly. We built a strict deletion flow that automatically scrubs the corresponding file from the external system, maintaining perfect database hygiene and freeing up storage.

### Technical Highlight & Workflow
By using raw HTTP requests instead of premium out-of-the-box connectors, we significantly reduced licensing costs while maintaining robust error-handling.
<img src="/work/SharePoint-Assembly_Flow1_CreateModify.png" alt="Create and Modify Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
<img src="/work/SharePoint-Assembly_Flow2_Delete.png" alt="Deletion Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
`;

async function updateRemainingProjects() {
  try {
    await sql`UPDATE projects SET content = ${emailPlannerContent.trim()} WHERE slug = 'automated-email-to-planner-task-lifecycle'`;
    await sql`UPDATE projects SET content = ${assemblySyncContent.trim()} WHERE slug = 'sharepoint-assembly-document-sync'`;
    console.log("Remaining projects updated successfully.");
  } catch (err) {
    console.error("Error updating DB:", err);
  }
}

updateRemainingProjects();
