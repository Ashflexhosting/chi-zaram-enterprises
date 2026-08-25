/**
 * Harvest Editorial accessibility controls: persistent text scaling and a
 * high-contrast mode that users can toggle from any public page.
 */
import { Accessibility, Contrast, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "chi-zaram-accessibility";
const scaleSteps = [0.9, 1, 1.1, 1.2, 1.3];

function readPreference() {
  if (typeof window === "undefined") return { scale: 1, contrast: false };
  try {
    return { ...{ scale: 1, contrast: false }, ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { scale: 1, contrast: false };
  }
}

export default function AccessibilityWidget() {
  const preference = readPreference();
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState<number>(preference.scale);
  const [contrast, setContrast] = useState<boolean>(preference.contrast);

  useEffect(() => {
    document.documentElement.style.setProperty("--a11y-scale", String(scale));
    document.documentElement.classList.toggle("high-contrast", contrast);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ scale, contrast }));
  }, [scale, contrast]);

  const scaleIndex = scaleSteps.indexOf(scale);

  const reset = () => {
    setScale(1);
    setContrast(false);
  };

  return (
    <div className="accessibility-widget">
      {open && (
        <div className="accessibility-panel" role="dialog" aria-label="Accessibility settings">
          <div className="accessibility-panel__top">
            <strong>Accessibility</strong>
            <button type="button" aria-label="Close accessibility settings" onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <p>Adjust the reading experience to suit your needs.</p>
          <div className="accessibility-control">
            <span><Accessibility size={16} /> Text size</span>
            <div className="accessibility-stepper">
              <button type="button" aria-label="Decrease text size" disabled={scaleIndex <= 0} onClick={() => setScale(scaleSteps[Math.max(0, scaleIndex - 1)])}><Minus size={15} /></button>
              <strong>{Math.round(scale * 100)}%</strong>
              <button type="button" aria-label="Increase text size" disabled={scaleIndex >= scaleSteps.length - 1} onClick={() => setScale(scaleSteps[Math.min(scaleSteps.length - 1, scaleIndex + 1)])}><Plus size={15} /></button>
            </div>
          </div>
          <button className={`accessibility-toggle ${contrast ? "is-active" : ""}`} type="button" aria-pressed={contrast} onClick={() => setContrast(!contrast)}><Contrast size={16} /><span>High contrast</span><i /></button>
          <button className="accessibility-reset" type="button" onClick={reset}><RotateCcw size={14} /> Reset settings</button>
        </div>
      )}
      <button className={`accessibility-trigger ${open ? "is-open" : ""}`} type="button" aria-label="Open accessibility settings" aria-expanded={open} onClick={() => setOpen(!open)}><Accessibility size={21} /><span>Accessibility</span></button>
    </div>
  );
}
