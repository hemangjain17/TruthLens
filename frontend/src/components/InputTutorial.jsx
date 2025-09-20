import React, { useEffect, useState, useRef } from "react";

const INPUT_STEPS = [
  {
    selector: "#textInput",
    title: "News Text Input",
    description:
      "Enter the news text you want to verify here. This will be analyzed for authenticity and fact-checked.",
    placement: "right",
  },
  {
    selector: "#videoUpload",
    title: "Video Upload",
    description:
      "Upload video files related to your news. The system will extract audio and analyze the content.",
    placement: "right",
  },
  {
    selector: "#videoLinks",
    title: "Video Links",
    description:
      "Add video URLs (YouTube, etc.) for additional verification. The system will download and analyze these videos.",
    placement: "right",
  },
  {
    selector: "#relatedLinks",
    title: "Related Links",
    description:
      "Add news articles, blog posts, or other web links related to your news for cross-verification.",
    placement: "right",
  },
  {
    selector: "#submitButton",
    title: "Submit for Analysis",
    description:
      "Click here to submit all your inputs for comprehensive fact-checking and analysis.",
    placement: "top",
  },
];

export default function InputTutorial({
  storageKey = "input_tutorial_shown",
  steps = INPUT_STEPS,
  autoStart = true,
  onClose = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const tooltipRef = useRef(null);

  // Show tutorial when coming from Dashboard or when autoStart is true
  useEffect(() => {
    try {
      const shouldContinue =
        localStorage.getItem("continue_tutorial_on_input") === "true";
      if (shouldContinue && autoStart) {
        // Clear the flag
        localStorage.removeItem("continue_tutorial_on_input");
        // delay slightly so Input DOM has time to render
        const t = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // localStorage might not be available; just show tutorial if autoStart
      if (autoStart) {
        const t = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(t);
      }
    }
  }, [autoStart]);

  // calculate highlight rect for current step
  const calculateRect = (step) => {
    if (!step || !step.selector) return null;
    const el = document.querySelector(step.selector);
    if (!el) return null;

    const r = el.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height,
      centerX: r.left + window.scrollX + r.width / 2,
      centerY: r.top + window.scrollY + r.height / 2,
    };
  };

  useEffect(() => {
    if (!isOpen) return;

    const update = () => {
      const step = steps[index];
      const r = calculateRect(step);
      setRect(r);
      if (r) {
        // try to ensure the element is visible
        const el = document.querySelector(step.selector);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    // run immediately and on events
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  // keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  const finish = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const next = () => {
    if (index >= steps.length - 1) return finish();
    setIndex((i) => i + 1);
  };

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  if (!isOpen) return null;

  const step = steps[index] || {};

  // tooltip positioning logic using placement hints
  const getTooltipStyle = () => {
    const padding = 12;
    const tooltipWidth = 360; // suggested width
    const tooltipHeight = 160; // fallback height
    if (!rect) {
      // center of screen
      return {
        left: `calc(50% - ${tooltipWidth / 2}px)`,
        top: `calc(50% - ${tooltipHeight / 2}px)`,
        width: tooltipWidth,
      };
    }

    const { top, left, width, height } = rect;
    let style = { position: "absolute" };

    switch (step.placement) {
      case "left":
        style.left = Math.max(8, left - tooltipWidth - padding) + "px";
        style.top = Math.max(8, top + window.scrollY - padding) + "px";
        style.width = tooltipWidth + "px";
        break;
      case "right":
        style.left = left + width + padding + "px";
        style.top = Math.max(8, top - padding) + "px";
        style.width = tooltipWidth + "px";
        break;
      case "top":
        style.left = Math.max(8, left + width / 2 - tooltipWidth / 2) + "px";
        style.top = Math.max(8, top - tooltipHeight - padding) + "px";
        style.width = tooltipWidth + "px";
        break;
      default:
        style.left = Math.max(8, left + width / 2 - tooltipWidth / 2) + "px";
        style.top = top + height + padding + "px";
        style.width = tooltipWidth + "px";
        break;
    }

    // ensure tooltip is inside viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (parseFloat(style.left) + tooltipWidth > vw) {
      style.left = Math.max(8, vw - tooltipWidth - 8) + "px";
    }
    if (parseFloat(style.top) + tooltipHeight > window.scrollY + vh) {
      style.top = Math.max(8, window.scrollY + vh - tooltipHeight - 8) + "px";
    }

    return style;
  };

  const tooltipStyle = getTooltipStyle();

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Dimmed overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={handleClose}></div>

      {/* Highlight box around the target element (if found) */}
      {rect && (
        <div
          aria-hidden
          className="absolute rounded-lg ring-4 ring-sky-400/40 shadow-2xl"
          style={{
            left: rect.left + "px",
            top: rect.top + "px",
            width: rect.width + "px",
            height: rect.height + "px",
            boxSizing: "border-box",
            transition: "all 220ms ease",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        className="absolute bg-white rounded-2xl p-5 shadow-xl text-black"
        style={{ ...tooltipStyle, zIndex: 60 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">{step.title || "Step"}</h4>
            <p
              className="text-sm text-neutral-600 mt-1"
              style={{ maxWidth: 540 }}
            >
              {step.description || "Description goes here."}
            </p>
            <p className="text-xs text-neutral-400 mt-3">
              Step {index + 1} of {steps.length}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={handleClose}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className={`px-4 py-2 rounded-lg text-sm border ${
                index === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            <button
              onClick={next}
              className="px-4 py-2 rounded-lg text-sm bg-sky-600 text-white hover:bg-sky-700"
            >
              {index >= steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>

          <div className="text-sm text-neutral-500">Press ← → to navigate</div>
        </div>
      </div>
    </div>
  );
}
