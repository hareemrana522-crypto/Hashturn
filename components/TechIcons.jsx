import { getToolIcon } from "@/lib/tool-icons";
import Image from "next/image";

// Renders a row of circular tool-icon badges — visually identical to
// the badges used in the Industry Tools orbit wheel (glass background,
// hover scale + brand-color glow, name tooltip on hover) — but static,
// no spinning/orbit motion.
export default function TechIcons({ tools }) {
  if (!tools?.length) return null;

  return (
    <div className="tech-icons-row">
      {tools.map((name) => {
        const { img, color, label } = getToolIcon(name);
        return (
          <div
            className="tech-icon-badge"
            style={{ "--icon-color": color }}
            key={name}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image src={`/${img}`} alt="" height={24} width={24} style={{ width: 'auto' }} />
            ) : (
              <i className="fa-solid fa-code"></i>
            )}
            <span className="tech-icon-tooltip">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
