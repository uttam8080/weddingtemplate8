import React from "react";

/**
 * SectionDivider Component
 * Renders 18 distinct section divider shapes inspired by vector UI designs.
 *
 * Props:
 * - variant: 'waves' | 'fan-opacity' | 'triangle' | 'tilt-opacity' | 'drops' | 'curve'
 *            | 'waves-brush' | 'pyramids' | 'tilt' | 'split' | 'triangle-asymmetrical'
 *            | 'waves-pattern' | 'book' | 'clouds' | 'zigzag' | 'mountains' | 'curve-asymmetrical' | 'split-notch'
 * - color: CSS color or Tailwind fill class (default: '#0D47A1')
 * - height: height in pixels or Tailwind height class (default: 60)
 * - flip: boolean to invert vertically (default: false)
 * - className: extra container styles
 */
export const SectionDivider = ({
  variant = "waves",
  color = "#0D47A1",
  accentColor = "rgba(144, 202, 249, 0.4)",
  height = 60,
  flip = false,
  className = "",
}) => {
  const heightValue = typeof height === "number" ? height : parseInt(height, 10);
  const containerStyle = {
    height: `${heightValue}px`,
    marginTop: flip ? `-${heightValue}px` : "0",
    marginBottom: !flip ? `-${heightValue}px` : "0",
  };

  const flipClass = flip ? "rotate-180" : "";

  const renderDividerSvg = () => {
    switch (variant) {
      case "waves":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,40 C1000,110 800,10 600,60 C400,110 200,20 0,50 Z"
              fill={color}
            />
          </svg>
        );

      case "fan-opacity":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon points="0,0 1200,0 1200,30 600,105 0,30" fill={color} />
            <polygon
              points="0,30 1200,30 1200,45 600,115 0,45"
              fill={color}
              opacity="0.4"
            />
            <polygon
              points="0,45 1200,45 1200,60 600,120 0,60"
              fill={color}
              opacity="0.2"
            />
          </svg>
        );

      case "triangle":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon points="0,0 1200,0 1200,20 600,110 0,20" fill={color} />
          </svg>
        );

      case "tilt-opacity":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon points="0,0 1200,0 1200,85 0,25" fill={color} />
            <polygon
              points="0,25 1200,85 1200,105 0,40"
              fill={color}
              opacity="0.3"
            />
          </svg>
        );

      case "drops":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,40 L1200,40
                C1180,40 1175,80 1170,80 C1165,80 1160,40 1140,40
                C1120,40 1115,100 1105,100 C1095,100 1090,40 1070,40
                C1050,40 1045,65 1040,65 C1035,65 1030,40 1000,40
                C970,40 965,90 955,90 C945,90 940,40 910,40
                C880,40 875,70 870,70 C865,70 860,40 830,40
                C800,40 795,110 785,110 C775,110 770,40 740,40
                C710,40 705,75 700,75 C695,75 690,40 660,40
                C630,40 625,95 615,95 C605,95 600,40 570,40
                C540,40 535,60 530,60 C525,60 520,40 490,40
                C460,40 455,105 445,105 C435,105 430,40 400,40
                C370,40 365,70 360,70 C355,70 350,40 320,40
                C290,40 285,85 275,85 C265,85 260,40 230,40
                C200,40 195,65 190,65 C185,65 180,40 150,40
                C120,40 115,100 105,100 C95,100 90,40 60,40
                C30,40 25,75 20,75 C15,75 10,40 0,40 Z"
              fill={color}
            />
          </svg>
        );

      case "curve":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,20 Q600,120 0,20 Z"
              fill={color}
            />
          </svg>
        );

      case "waves-brush":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,35 Q900,110 600,60 Q300,10 0,55 Z"
              fill={color}
            />
            <path
              d="M0,58 Q300,13 600,63 Q900,113 1200,38"
              fill="none"
              stroke={color}
              strokeWidth="3"
              opacity="0.6"
            />
            <path
              d="M0,64 Q300,19 600,69 Q900,119 1200,44"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        );

      case "pyramids":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon
              points="0,0 1200,0 1200,20 850,110 500,45 250,85 0,25"
              fill={color}
            />
          </svg>
        );

      case "tilt":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon points="0,0 1200,0 1200,90 0,15" fill={color} />
          </svg>
        );

      case "split":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon
              points="0,0 1200,0 1200,80 615,80 600,98 585,80 0,80"
              fill={color}
            />
          </svg>
        );

      case "triangle-asymmetrical":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <polygon points="0,0 1200,0 1200,35 450,110 0,25" fill={color} />
          </svg>
        );

      case "waves-pattern":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,60
                Q1150,105 1100,60 Q1050,105 1000,60 Q950,105 900,60
                Q850,105 800,60 Q750,105 700,60 Q650,105 600,60
                Q550,105 500,60 Q450,105 400,60 Q350,105 300,60
                Q250,105 200,60 Q150,105 100,60 Q50,105 0,60 Z"
              fill={color}
            />
          </svg>
        );

      case "book":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,20 Q900,20 600,105 Q300,20 0,20 Z"
              fill={color}
            />
          </svg>
        );

      case "clouds":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            {/* Background cloud layer with soft opacity */}
            <path
              d="M0,0 L1200,0 L1200,75
                C1180,75 1160,50 1120,50 C1080,50 1060,85 1020,85
                C980,85 960,40 910,40 C860,40 840,80 790,80
                C740,80 720,35 670,35 C620,35 600,90 550,90
                C500,90 480,45 430,45 C380,45 360,80 310,80
                C260,80 240,40 190,40 C140,40 120,75 70,75
                C40,75 20,60 0,60 Z"
              fill={color}
              opacity="0.35"
            />
            {/* Main puffy cloud layer */}
            <path
              d="M0,0 L1200,0 L1200,60
                C1170,60 1150,35 1110,35 C1070,35 1050,70 1010,70
                C970,70 950,25 900,25 C850,25 830,65 780,65
                C730,65 710,20 660,20 C610,20 590,75 540,75
                C490,75 470,30 420,30 C370,30 350,65 300,65
                C250,65 230,25 180,25 C130,25 110,60 60,60
                C30,60 15,45 0,45 Z"
              fill={color}
            />
          </svg>
        );

      case "zigzag":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,70
                L1180,95 L1160,70 L1140,95 L1120,70 L1100,95 L1080,70
                L1060,95 L1040,70 L1020,95 L1000,70 L980,95 L960,70
                L940,95 L920,70 L900,95 L880,70 L860,95 L840,70
                L820,95 L800,70 L780,95 L760,70 L740,95 L720,70
                L700,95 L680,70 L660,95 L640,70 L620,95 L600,70
                L580,95 L560,70 L540,95 L520,70 L500,95 L480,70
                L460,95 L440,70 L420,95 L400,70 L380,95 L360,70
                L340,95 L320,70 L300,95 L280,70 L260,95 L240,70
                L220,95 L200,70 L180,95 L160,70 L140,95 L120,70
                L100,95 L80,70 L60,95 L40,70 L20,95 L0,70 Z"
              fill={color}
            />
          </svg>
        );

      case "mountains":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,30 L1050,70 L900,40 L700,85 L500,45 L350,90 L150,50 L0,80 Z"
              fill={color}
              opacity="0.3"
            />
            <path
              d="M0,0 L1200,0 L1200,50 L1100,85 L950,55 L780,100 L600,60 L420,105 L220,65 L0,95 Z"
              fill={color}
              opacity="0.6"
            />
            <path
              d="M0,0 L1200,0 L1200,65 L1150,95 L1020,70 L850,115 L680,75 L500,110 L300,80 L100,110 L0,85 Z"
              fill={color}
            />
          </svg>
        );

      case "curve-asymmetrical":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,30 Q800,120 0,30 Z"
              fill={color}
            />
          </svg>
        );

      case "split-notch":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,80 L620,80 Q600,100 580,80 L0,80 Z"
              fill={color}
            />
          </svg>
        );

      default:
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              d="M0,0 L1200,0 L1200,40 C1000,110 800,10 600,60 C400,110 200,20 0,50 Z"
              fill={color}
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative z-20 w-full overflow-hidden leading-none select-none pointer-events-none ${flipClass} ${className}`}
      style={containerStyle}
    >
      {renderDividerSvg()}
    </div>
  );
};

export const SECTION_DIVIDER_VARIANTS = [
  { id: "waves", label: "Waves" },
  { id: "fan-opacity", label: "Fan Opacity" },
  { id: "triangle", label: "Triangle" },
  { id: "tilt-opacity", label: "Tilt Opacity" },
  { id: "drops", label: "Drops" },
  { id: "curve", label: "Curve" },
  { id: "waves-brush", label: "Waves Brush" },
  { id: "pyramids", label: "Pyramids" },
  { id: "tilt", label: "Tilt" },
  { id: "split", label: "Split" },
  { id: "triangle-asymmetrical", label: "Triangle Asymmetrical" },
  { id: "waves-pattern", label: "Waves Pattern" },
  { id: "book", label: "Book" },
  { id: "clouds", label: "Clouds" },
  { id: "zigzag", label: "Zigzag" },
  { id: "mountains", label: "Mountains" },
  { id: "curve-asymmetrical", label: "Curve Asymmetrical" },
  { id: "split-notch", label: "Split Notch" },
];
