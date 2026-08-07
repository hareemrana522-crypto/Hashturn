import { sql } from '../lib/db.js';

const paveContent = `
# PAVE Training: Scalable Certification Management

> "HashTurn revolutionized how we manage our training records. The new system is incredibly fast and our clients love the transparent access."
> — **Operations Manager, PAVE Training**

### The Challenge
PAVE Training needed a way to manage thousands of training records internally while providing their corporate clients with a professional, secure way to view their own employees' progress and certificates. The manual process of emailing PDFs and Excel sheets was no longer scalable and led to significant operational overhead.

### Our Solution
We built a robust, custom infrastructure using **SharePoint Online** as the database and frontend engine.

#### 1. The Admin Operations Hub
The "brain" of the operation. We configured a private, highly-secure Team site where the PAVE staff manages:
* **Workforce Registry:** A master list of all candidates with automated logic to flag missing NI numbers or upcoming expiries.
* **Multi-Channel Ingestion:** Using Power Automate to extract data from incoming emails and populate SharePoint registers seamlessly without human intervention.

#### 2. The Customer Training Portal
A high-end Communication site designed for the end-user, featuring:
* **Dynamic Filtering:** Clients can filter their workforce by "Supervisor" or "Gang" to see who is cleared for site work instantly.
* **Visual Dashboards:** Custom JSON-formatted "cards" provide a modern, app-like experience for viewing NRSWA and NVQ stages.
* **Security First:** Data is synced from the Admin Hub to the Portal using specialized flows, ensuring clients only see data relevant to their company.

### The Outcome
To meet the client's specific requirements, we bypassed standard list views to create a **hierarchical ownership structure**. This ensures that permissions are enforced at the item level, automatically hiding or showing data based on the user's login. 

The result is a fast, responsive UI that saves PAVE Training over 20 hours a week in manual admin work while delivering a premium digital experience to their corporate clients.
`;

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

### Work Flow
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

### Work Flow
By using raw HTTP requests instead of premium out-of-the-box connectors, we significantly reduced licensing costs while maintaining robust error-handling.
<img src="/work/SharePoint-Assembly_Flow1_CreateModify.png" alt="Create and Modify Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
<img src="/work/SharePoint-Assembly_Flow2_Delete.png" alt="Deletion Flow" style="max-width:100%; margin: 1rem 0; border-radius: 8px;"/>
`;

async function updateProjects() {
  try {
    await sql`UPDATE projects SET content = ${paveContent.trim()} WHERE slug = 'pave-training-operations-ecosystem'`;
    await sql`UPDATE projects SET content = ${emailPlannerContent.trim()} WHERE slug = 'automated-email-to-planner-task-lifecycle'`;
    await sql`UPDATE projects SET content = ${assemblySyncContent.trim()} WHERE slug = 'sharepoint-assembly-document-sync'`;
    console.log("All projects updated with new formatting and Work Flow headings.");
  } catch (err) {
    console.error("Error updating DB:", err);
  }
}

updateProjects();
