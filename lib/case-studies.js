export const CASE_STUDIES = [
  {
    slug: "pave-training-operations-ecosystem",
    category: "Business Process Automation",
    color: "var(--green)",
    client: "waynecurry121",
    image: "/work/pave-training-hero.jpg",
    title: "PAVE Training Operations Ecosystem",
    summary:
      "Development of a dual-layered SharePoint ecosystem designed to manage complex training certifications and workforce compliance. The system features a secure Internal Admin Hub for operations management and a synchronized External Customer Training Portal for real-time client access to certification data.",
    tech: ["SharePoint Online", "Power Automate", "Microsoft Teams", "JSON Formatting"],
    results: [
      "Centralized Compliance: Automated tracking of NPORS, EUSR, NRSWA, and NVQ certifications with dynamic expiry alerts.",
      "Secure External Sharing: Implemented a \"Master-to-Communication\" site architecture, allowing external guests to view live data without compromising internal security.",
      "Dynamic Data Visualization: Created custom-coded dashboards for \"Workforce Lists\" and \"Company Lists\" featuring real-time filtering by Supervisor, Gang, and Expiry status.",
      "Operational Efficiency: Reduced manual reporting by providing customers with self-service access to employee folders and digital certificate scans.",
    ],
    challenge:
      "PAVE Training needed a way to manage thousands of training records internally while providing their corporate clients with a professional, secure way to view their own employees' progress and certificates. The manual process of emailing PDFs and Excel sheets was no longer scalable.",
    solution:
      "We built a robust infrastructure using SharePoint Online as the database and frontend engine.",
    sections: [
      {
        heading: "1. The Admin Operations Hub",
        body: "The \"brain\" of the operation. We configured a private Team site where the PAVE staff manages all candidate data. A master Workforce Registry provides automated logic to flag missing NI numbers or upcoming certification expiries. Multi-Channel Ingestion uses Power Automate to extract data from incoming emails and automatically populate SharePoint registers — eliminating manual data entry.",
        bullets: [
          "Workforce Registry: A master list of all candidates with automated logic to flag missing NI numbers or upcoming expiries.",
          "Multi-Channel Ingestion: Using Power Automate to extract data from incoming emails and populate SharePoint registers.",
        ],
      },
      {
        heading: "2. The Customer Training Portal",
        body: "A high-end Communication site designed for the end-user experience. Clients access a secure, branded portal that shows only their own employees' data.",
        bullets: [
          "Dynamic Filtering: Clients can filter their workforce by Supervisor or Gang to see who is cleared for site work instantly.",
          "Visual Dashboards: Custom JSON-formatted cards provide a modern, app-like experience for viewing NRSWA and NVQ stages.",
          "Security First: Data is synced from the Admin Hub to the Portal using specialized flows, ensuring clients only see data relevant to their company.",
        ],
      },
    ],
    technicalHighlight:
      "To meet the client's specific requirements, we bypassed standard list views to create a hierarchical ownership structure. This ensures that permissions are enforced at the item level, automatically hiding or showing data based on the user's login, all while maintaining a fast, responsive UI.",
  },
  {
    slug: "automated-email-to-planner-task-lifecycle",
    category: "Business Process Automation",
    color: "var(--yellow)",
    client: "Hashturn Client",
    image: "/work/project2.png.jpeg",
    title: "Automated Email-to-Planner Task Lifecycle",
    summary:
      "This Power Automate solution bridges the gap between your inbox and task board. It creates a closed-loop system that automatically tracks email threads and syncs any new replies directly into the corresponding Planner task, ensuring a single source of truth.",
    tech: ["Power Automate", "Microsoft Planner", "Outlook", "Gemini API"],
    results: [
      "Single Source of Truth: Syncs new replies directly into corresponding Planner tasks.",
      "AI Data Extraction: Parses emails to convert text into actionable checklists.",
      "No Manual Entry: Eliminates manual copy-pasting and missing context."
    ],
    challenge:
      "Teams often receive requests via email, but managing the ongoing communication is a challenge. While creating an initial task from an email is simple, subsequent replies get trapped in the inbox. This forces manual copy-pasting, leading to lost time and disjointed tracking.",
    solution:
      "A closed-loop Power Automate system that automatically tracks email threads and syncs new replies directly into the corresponding Planner task.",
    sections: [
      {
        heading: "1. Trigger & Attachment Handling",
        body: "The flow triggers when an email hits a specific folder, extracts details, processes attachments by saving them to SharePoint, and generates accessible sharing links.",
        bullets: []
      },
      {
        heading: "2. AI Data Extraction & Smart Routing",
        body: "Integrates with Gemini API to intelligently parse the email body. A SharePoint list checks if the thread is new or existing to either create a new task or push the reply as an update.",
        bullets: []
      },
      {
        heading: "3. Advanced Updates",
        body: "Companion flows handle complex data injections. By fetching the task's ETag, the system safely injects AI-generated checklists without overwriting manual updates.",
        bullets: []
      }
    ],
    technicalHighlight:
      "Advanced ETag fetching ensures that AI data injections do not overwrite existing manual updates on active tasks.",
    images: [
      "/work/Email-to-Planner_Flow1_Trigger.png",
      "/work/Email-to-Planner_Flow2_Companion.png",
      "/work/Email-to-Planner_Flow3_ETagInject.png"
    ]
  },
  {
    slug: "full-lifecycle-document-synchronization-sharepoint-assembly",
    category: "API & Webhook Integration",
    color: "var(--blue)",
    client: "Hashturn Client",
    image: "/work/project3.png.jpeg",
    title: "SharePoint & Assembly Document Sync",
    summary:
      "This architecture utilizes a two-part Power Automate solution to ensure a perfect, automated mirror between your SharePoint environment and Assembly, maintaining strict database hygiene and eliminating manual file management.",
    tech: ["SharePoint", "Assembly API", "Power Automate", "HTTP Requests"],
    results: [
      "Two-Way Sync: Automated mirroring of both creation/modification and cascading deletions.",
      "No Orphaned Data: Perfect synchronization ensures systems remain completely aligned.",
      "Streamlined Storage: Eliminates bloated storage and version control chaos."
    ],
    challenge:
      "Maintaining parity between a primary document repository (SharePoint) and an external project management system (like Assembly) is a constant struggle, resulting in bloated storage, orphaned files, and version control chaos when deletions aren't communicated.",
    solution:
      "A two-part Power Automate solution to ensure a perfect, automated mirror. Dedicated flows for both Create/Modify and Delete actions maintain strict database hygiene.",
    sections: [
      {
        heading: "1. The Creation & Modification Sync",
        body: "Handles ingestion and mirroring of new assets. Captures file paths to establish routing, queries tracking database to prevent duplicates, and intelligently pushes file content or directory structures to Assembly.",
        bullets: []
      },
      {
        heading: "2. The Cascading Deletion Sync",
        body: "A cleanup engine ensuring purged items in SharePoint are instantly purged from Assembly. Uses historical metadata to map IDs and executes targeted HTTP DELETE requests.",
        bullets: []
      }
    ],
    technicalHighlight:
      "Uses a tracking database (Get Existing Items) and targeted HTTP requests to Assembly API for precise ID mapping and synchronization."
    ,
    images: [
      "/work/SharePoint-Assembly_Flow1_CreateModify.png",
      "/work/SharePoint-Assembly_Flow2_Delete.png"
    ]
  }
];

export const TOOL_LOGOS = {
  "SharePoint": { img: "share.png.png", color: "#1c667b", h: 26 },
  "SharePoint Online": { img: "share.png.png", color: "#1c667b", h: 26 },
  "Power Automate": { img: "automate.png.png", color: "#7ec9f7", h: 26 },
  "Microsoft Teams": { img: "msteam.png.png", color: "#464eb8", h: 25 },
  "JSON Formatting": { text: "{ }", color: "#f7df1e" },
  "Microsoft Planner": { img: "365.png.png", color: "#804f9d", h: 26 },
  "Outlook": { img: "out.png.png", color: "#0078d4", h: 23 },
  "Gemini API": { img: "gemini.png", color: "#1a73e8", h: 26 },
  "Assembly API": { img: "assembly.png", color: "#3b5cda", h: 26 },
  "HTTP Requests": { img: "http.png", color: "#13a078", h: 26 },
  "API Integration": { img: "node.png.png", color: "#339933", h: 26 },
  "Microsoft Forms": { img: "word.png.png", color: "#185abd", h: 23 },
  "HubSpot CRM": { img: "azure.png.png", color: "#0089d6", h: 26 },
};
