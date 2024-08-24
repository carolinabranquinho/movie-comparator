import React, { KeyboardEvent, ReactNode, useRef, useEffect } from "react";

interface SvgButtonProps {
  onClick: () => void;
  children: ReactNode;
  tabIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  tooltip?: string; // Tooltip text
}

export function SvgButton({
  onClick,
  children,
  tabIndex = 0,
  className,
  style,
  tooltip,
}: SvgButtonProps) {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (groupRef.current) {
      const bbox = groupRef.current.getBBox();
      const rect = groupRef.current.querySelector("rect");

      if (rect) {
        rect.setAttribute("x", bbox.x.toString());
        rect.setAttribute("y", bbox.y.toString());
        rect.setAttribute("width", bbox.width.toString());
        rect.setAttribute("height", bbox.height.toString());
      }
    }
  }, [children]);

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
      event.preventDefault();
    }
  };

  return (
    <g
      ref={groupRef}
      role="button"
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onFocus={(e) => (e.currentTarget.style.filter = "brightness(1.2)")}
      onBlur={(e) => (e.currentTarget.style.filter = "none")}
      onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
      onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
      cursor="pointer"
      className={className}
      style={style}
    >
      {/* Tooltip */}
      {tooltip && <title>{tooltip}</title>}
      {/* Transparent background rectangle */}
      <rect fill="transparent" />
      {children}
    </g>
  );
}
