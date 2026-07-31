// Maps a tool/tech name (as used in lib/case-studies.js `tech` arrays)
// to its logo image + brand color — the exact same icons/colors used
// in the Industry Tools orbit wheel, so everything stays visually
// consistent across the site.
//
// Matching is done by substring (case-insensitive), so "SharePoint
// Online" still matches the "sharepoint" entry below, etc.

const TOOL_ICON_MAP = [
  { key: "sharepoint", img: "share.png.png", color: "#1c667b", label: "SharePoint" },
  { key: "power automate", img: "automate.png.png", color: "#7ec9f7", label: "Power Automate" },
  { key: "power apps", img: "Powerapps.png.png", color: "#742774", label: "Power Apps" },
  { key: "teams", img: "msteam.png.png", color: "#464eb8", label: "Microsoft Teams" },
  { key: "microsoft 365", img: "365.png.png", color: "#804f9d", label: "Microsoft 365" },
  { key: "azure", img: "azure.png.png", color: "#0089d6", label: "Microsoft Azure" },
  { key: "aws", img: "aws.png.png", color: "#ff9900", label: "AWS" },
  { key: "excel", img: "excel.png.png", color: "#107c41", label: "MS Excel" },
  { key: "word", img: "word.png.png", color: "#185abd", label: "MS Word" },
  { key: "powerpoint", img: "power.png.png", color: "#b7472a", label: "PowerPoint" },
  { key: "outlook", img: "out.png.png", color: "#0078d4", label: "MS Outlook" },
  { key: "onedrive", img: "drive.png.png", color: "#0060b6", label: "OneDrive" },
  { key: "react", img: "react.png.png", color: "#61dafb", label: "React.js" },
  { key: "angular", img: "ang.png.png", color: "#dd0031", label: "Angular" },
  { key: "node", img: "node.png.png", color: "#339933", label: "Node.js" },
  { key: "python", img: "pyth.png.png", color: "#afb746", label: "Python" },
  { key: "django", img: "djan.png.png", color: "#092e20", label: "Django" },
  { key: "sql", img: "sql.png.png", color: "#3882ba", label: "SQL Server" },
  { key: "mongo", img: "mongo.png.png", color: "#47a248", label: "MongoDB" },
  { key: "docker", img: "docker.png.png", color: "#2496ed", label: "Docker" },
  { key: "power bi", img: "powerbi.png.png", color: "#f2c811", label: "Power BI" },
];

// Returns { img, color, label } for a given tool name, or a sensible
// generic fallback (a code icon) if nothing matches.
export function getToolIcon(name) {
  const lower = name.toLowerCase();
  const match = TOOL_ICON_MAP.find((t) => lower.includes(t.key));
  if (match) return match;
  return { img: null, color: "#6b7280", label: name };
}
