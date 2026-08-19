// Pure presentational — all hover/tooltip behavior is handled by CSS
// (:hover on .tool-badge-card), so this can stay a server component.
import Image from "next/image";

const OUTER_RING = [
  { angle: 0, img: "share.png.png", h: 30, color: "#1c667b", label: "SharePoint" },
  { angle: 30, img: "automate.png.png", h: 32, color: "#7ec9f7", label: "Power Automate" },
  { angle: 60, img: "Powerapps.png.png", h: 30, color: "#742774", label: "Power Apps" },
  { angle: 90, img: "msteam.png.png", h: 30, color: "#464eb8", label: "MS Teams" },
  { angle: 120, img: "365.png.png", h: 32, color: "#804f9d", label: "Microsoft 365" },
  { angle: 150, img: "azure.png.png", h: 30, color: "#0089d6", label: "Microsoft Azure" },
  { angle: 180, img: "aws.png.png", h: 25, color: "#ff9900", label: "AWS" },
  { angle: 210, img: "excel.png.png", h: 25, color: "#107c41", label: "MS Excel" },
  { angle: 240, img: "word.png.png", h: 25, color: "#185abd", label: "MS Word" },
  { angle: 270, img: "power.png.png", h: 25, color: "#b7472a", label: "PowerPoint" },
  { angle: 300, img: "out.png.png", h: 25, color: "#0078d4", label: "MS Outlook" },
  { angle: 330, img: "drive.png.png", h: 25, color: "#0060b6", label: "OneDrive" },
];

const INNER_RING = [
  { angle: 0, img: "react.png.png", h: 30, color: "#61dafb", label: "React.js" },
  { angle: 40, img: "ang.png.png", h: 32, color: "#dd0031", label: "Angular" },
  { angle: 80, img: "node.png.png", h: 30, color: "#339933", label: "Node.js" },
  { angle: 120, img: "pyth.png.png", h: 30, color: "#afb746", label: "Python" },
  { angle: 160, img: "djan.png.png", h: 30, color: "#092e20", label: "Django" },
  { angle: 200, img: "sql.png.png", h: 30, color: "#3882ba", label: "SQL Server" },
  { angle: 240, img: "mongo.png.png", h: 35, color: "#47a248", label: "MongoDB" },
  { angle: 280, img: "docker.png.png", h: 23, color: "#2496ed", label: "Docker" },
  { angle: 320, img: "powerbi.png.png", h: 30, color: "#f2c811", label: "Power BI" },
];

function OrbitSlot({ item, radiusDist }) {
  return (
    <div
      className="orbit-slot"
      style={{ "--angle": `${item.angle}deg`, "--radius-dist": `${radiusDist}px` }}
    >
      <div className="tool-badge-card" style={{ "--icon-color": item.color }}>
        <Image src={`/${item.img}`} alt={item.label || ""} height={item.h} width={item.h * 1.5} style={{ objectFit: 'contain', width: 'auto' }} />
        <span className="tool-tooltip">{item.label}</span>
      </div>
    </div>
  );
}

export default function OrbitWheel() {
  return (
    <div className="master-orbit-wrapper">
      <div className="orbit-center-core">
        <div className="core-pulse-dot">
          <Image src="/logo.png.png" alt="" width={60} height={60} unoptimized style={{ objectFit: 'contain' }} />
        </div>
      </div>

      <div className="orbit-ring ring-outer">
        {OUTER_RING.map((item) => (
          <OrbitSlot key={item.label} item={item} radiusDist={250} />
        ))}
      </div>

      <div className="orbit-ring ring-inner">
        {INNER_RING.map((item) => (
          <OrbitSlot key={item.label} item={item} radiusDist={150} />
        ))}
      </div>
    </div>
  );
}
