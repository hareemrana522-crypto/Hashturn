// Reusable small orbit ring used inside each service row on the
// Services page. Pass an array of { img, label, boost? } — angles
// are spread evenly around the circle automatically.
//
// Example:
// <MiniOrbit
//   tools={[
//     { img: "automate.png.png", label: "Power Automate", boost: true },
//     { img: "share.png.png", label: "SharePoint" },
//   ]}
// />

export default function MiniOrbit({ tools }) {
  const step = 360 / tools.length;

  return (
    <div className="mini-orbit">
      <div className="mini-orbit-ring">
        {tools.map((tool, i) => (
          <div
            key={tool.label}
            className="mini-orbit-slot"
            style={{ "--angle": `${i * step}deg` }}
          >
            <div className="mini-tool-badge">
              <img
                src={`/${tool.img}`}
                alt={tool.label}
                className={tool.boost ? "icon-boost" : undefined}
              />
              <span className="mini-tool-tooltip">{tool.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
