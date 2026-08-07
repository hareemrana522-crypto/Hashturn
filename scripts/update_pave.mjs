import { sql } from '../lib/db.js';

const newContent = `
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

### The Outcome & Technical Highlight
To meet the client's specific requirements, we bypassed standard list views to create a **hierarchical ownership structure**. This ensures that permissions are enforced at the item level, automatically hiding or showing data based on the user's login. 

The result is a fast, responsive UI that saves PAVE Training over 20 hours a week in manual admin work while delivering a premium digital experience to their corporate clients.
`;

async function updateDB() {
  try {
    await sql`UPDATE projects SET content = ${newContent.trim()} WHERE slug = 'pave-training-operations-ecosystem'`;
    console.log("Database updated successfully.");
  } catch (err) {
    console.error("Error updating DB:", err);
  }
}

updateDB();
