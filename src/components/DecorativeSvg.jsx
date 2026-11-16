import React from "react";

export const MandalaSvg = ({ className = "", size = 120, color = "#D4AF37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
    <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="2" />
    <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="100" r="45" stroke={color} strokeWidth="1.5" />
    <circle cx="100" cy="100" r="20" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
    
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M100 30 C90 50, 90 60, 100 70 C110 60, 110 50, 100 30 Z"
          fill={color}
          opacity="0.3"
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="100" cy="22" r="3" fill={color} />
        <path d="M100 70 Q95 80 100 90 Q105 80 100 70 Z" fill={color} opacity="0.5" />
      </g>
    ))}
    
    <circle cx="100" cy="100" r="8" fill={color} />
  </svg>
);

export const PalaceArchSvg = ({ className = "", color = "#D4AF37" }) => (
  <svg
    viewBox="0 0 400 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full ${className}`}
  >
    <path
      d="M10 110 V50 C10 50, 50 10, 200 10 C350 10, 390 50, 390 50 V110"
      stroke={color}
      strokeWidth="3"
    />
    <path
      d="M20 110 V55 C20 55, 60 20, 200 20 C340 20, 380 55, 380 55 V110"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M200 0 L208 15 L200 22 L192 15 Z"
      fill={color}
    />
    <circle cx="200" cy="-5" r="4" fill={color} />
    <path
      d="M200 20 Q170 20 150 40 Q130 60 110 50 Q90 40 70 60 Q50 80 20 100"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M200 20 Q230 20 250 40 Q270 60 290 50 Q310 40 330 60 Q350 80 380 100"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export const LotusSvg = ({ className = "", size = 60, color = "#D4AF37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M50 5 C40 30, 45 55, 50 70 C55 55, 60 30, 50 5 Z" fill={color} opacity="0.9" />
    <path d="M50 70 C30 50, 20 30, 35 15 C45 30, 48 55, 50 70 Z" fill={color} opacity="0.75" />
    <path d="M50 70 C70 50, 80 30, 65 15 C55 30, 52 55, 50 70 Z" fill={color} opacity="0.75" />
    <path d="M50 70 C15 60, 5 40, 20 28 C35 42, 45 60, 50 70 Z" fill={color} opacity="0.6" />
    <path d="M50 70 C85 60, 95 40, 80 28 C65 42, 55 60, 50 70 Z" fill={color} opacity="0.6" />
    <path d="M25 70 Q50 78 75 70 Q50 73 25 70 Z" fill={color} />
  </svg>
);

export const DiyaSvg = ({ className = "", size = 48, color = "#D4AF37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-float-diya ${className}`}
  >
    <ellipse cx="50" cy="25" rx="12" ry="20" fill="#FF9933" opacity="0.3" />
    <path d="M50 5 Q58 25 50 38 Q42 25 50 5 Z" fill="#FF9933" />
    <path d="M50 12 Q54 26 50 35 Q46 26 50 12 Z" fill="#FFE066" />
    <circle cx="50" cy="28" r="3" fill="#FFFFFF" />

    <path
      d="M15 50 Q50 45 85 50 Q90 68 80 80 Q50 95 20 80 Q10 68 15 50 Z"
      fill={color}
    />
    <path
      d="M15 50 C25 58, 75 58, 85 50 C75 46, 25 46, 15 50 Z"
      fill="#4A2C2A"
      opacity="0.3"
    />
    <circle cx="50" cy="68" r="4" fill="#800020" />
    <path d="M30 68 Q50 74 70 68" stroke="#800020" strokeWidth="1.5" />
  </svg>
);

export const KalashSvg = ({ className = "", size = 56, color = "#D4AF37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="50" cy="22" rx="14" ry="18" fill="#5c3826" />
    <path d="M50 35 L30 18 L42 32 Z" fill="#006A4E" />
    <path d="M50 35 L70 18 L58 32 Z" fill="#006A4E" />
    <path d="M50 35 L50 10 L45 30 Z" fill="#006A4E" />

    <path
      d="M32 38 H68 L78 52 C88 70, 78 95, 50 95 C22 95, 12 70, 22 52 Z"
      fill={color}
    />
    <path d="M42 62 H58 M50 54 V70 M42 54 V58 M58 66 V70 M54 54 H58 M42 66 H46" stroke="#800020" strokeWidth="2" strokeLinecap="round" />
    <rect x="30" y="38" width="40" height="6" rx="2" fill="#B22222" />
  </svg>
);

export const PeacockSvg = ({ className = "", size = 64, color = "#D4AF37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M50 10 C20 40, 20 80, 50 95 C80 80, 80 40, 50 10 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
    <path d="M50 25 C30 45, 30 70, 50 82 C70 70, 70 45, 50 25 Z" fill="#006A4E" opacity="0.6" />
    <path d="M50 38 C40 50, 40 65, 50 72 C60 65, 60 50, 50 38 Z" fill="#0047AB" />
    <ellipse cx="50" cy="55" rx="5" ry="8" fill="#D4AF37" />
  </svg>
);

export const GaneshaSvg = ({ className = "", size = 48, color = "#B22222" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M40 25 L50 10 L60 25 Z" fill={color} />
    <circle cx="50" cy="12" r="2.5" fill="#FFD700" />
    <path d="M35 25 H65 V30 H35 Z" fill={color} />
    
    <ellipse cx="28" cy="42" rx="12" ry="16" fill={color} opacity="0.85" />
    <ellipse cx="72" cy="42" rx="12" ry="16" fill={color} opacity="0.85" />

    <circle cx="50" cy="40" r="16" fill={color} />
    
    <path d="M47 30 H53 V38 H47 Z" fill="#FFD700" />
    <circle cx="50" cy="34" r="2" fill="#B22222" />

    <path
      d="M50 48 Q42 55 38 68 Q36 78 45 80 Q52 80 50 72 Q46 68 45 62 Q48 55 52 48 Z"
      fill={color}
    />

    <circle cx="48" cy="74" r="3.5" fill="#FFD700" />

    <path d="M58 48 L64 52 L59 54 Z" fill="#FFFFFF" />
  </svg>
);

export const TraditionalCornerFloralSvg = ({ position }) => {
  const isRight = position === "top-right";
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${isRight ? "scale-x-[-1]" : ""}`}
    >
      <path d="M-10 -10 Q30 20 90 15 Q60 50 110 70" stroke="#2E5A27" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 10 Q28 2 35 15 Q22 20 15 10 Z" fill="#3B7A32" />
      <path d="M35 18 Q50 10 55 24 Q40 28 35 18 Z" fill="#2E5A27" />
      <path d="M60 16 Q75 5 82 20 Q68 25 60 16 Z" fill="#4A8B40" />
      <path d="M75 35 Q90 25 98 40 Q82 45 75 35 Z" fill="#3B7A32" />
      <path d="M85 55 Q102 48 108 62 Q92 68 85 55 Z" fill="#2E5A27" />
      
      <circle cx="28" cy="12" r="7" fill="#E65100" />
      <circle cx="28" cy="12" r="5" fill="#F57C00" />
      <circle cx="28" cy="12" r="2.5" fill="#FFB74D" />

      <circle cx="58" cy="22" r="9" fill="#E65100" />
      <circle cx="58" cy="22" r="6" fill="#FB8C00" />
      <circle cx="58" cy="22" r="3" fill="#FFE082" />

      <circle cx="92" cy="38" r="8" fill="#E65100" />
      <circle cx="92" cy="38" r="5.5" fill="#F57C00" />
      <circle cx="92" cy="38" r="2.5" fill="#FFD54F" />

      <circle cx="102" cy="62" r="4" fill="#FB8C00" />
      <circle cx="42" cy="28" r="3.5" fill="#E65100" />
    </svg>
  );
};

export const TraditionalCoupleFenceSvg = ({ className = "" }) => (
  <svg
    viewBox="0 0 500 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-lg mx-auto ${className}`}
  >
    <path d="M60 25 Q68 20 75 25 Q82 20 90 25" stroke="#333" strokeWidth="1.2" fill="none" />
    <path d="M410 30 Q418 25 425 30 Q432 25 440 30" stroke="#333" strokeWidth="1.2" fill="none" />

    <path d="M80 60 C75 52 65 55 72 65 C65 72 75 78 80 70 C85 78 95 72 88 65 C95 55 85 52 80 60 Z" fill="#1E88E5" opacity="0.8" />

    <path d="M0 240 Q50 130 120 180 Q180 120 250 170 Q320 110 380 160 Q450 120 500 240 Z" fill="#3B7A32" opacity="0.25" />
    <path d="M20 240 Q80 150 150 200 Q220 140 280 190 Q360 130 420 180 Q470 140 500 240 Z" fill="#2E5A27" opacity="0.35" />

    <circle cx="60" cy="180" r="5" fill="#E65100" />
    <circle cx="110" cy="165" r="6" fill="#E91E63" />
    <circle cx="390" cy="170" r="6" fill="#E65100" />
    <circle cx="440" cy="185" r="5" fill="#E91E63" />

    <g transform="translate(185, 45)">
      <ellipse cx="30" cy="22" rx="10" ry="12" fill="#5D4037" />
      <circle cx="30" cy="18" r="9" fill="#212121" />
      <ellipse cx="30" cy="22" rx="7" ry="8" fill="#FFCC80" />
      <path d="M23 23 Q30 32 37 23 Q30 28 23 23 Z" fill="#3E2723" />
      <rect x="26" y="28" width="8" height="6" fill="#FFCC80" />
      <path d="M15 34 Q30 31 45 34 L48 95 H12 Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
      <path d="M30 34 V70" stroke="#BDBDBD" strokeWidth="1" />
      <rect x="34" y="42" width="7" height="9" fill="#EEEEEE" stroke="#E0E0E0" strokeWidth="0.8" />
      <circle cx="30" cy="42" r="1.2" fill="#9E9E9E" />
      <circle cx="30" cy="52" r="1.2" fill="#9E9E9E" />
      <circle cx="30" cy="62" r="1.2" fill="#9E9E9E" />
      <path d="M12 95 H48 L52 165 H8 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
      <path d="M12 95 H18 V165 H12 Z" fill="#D4AF37" opacity="0.85" />
    </g>

    <g transform="translate(235, 52)">
      <circle cx="34" cy="16" r="8" fill="#111" />
      <path d="M26 12 Q34 6 42 12" stroke="#FFF" strokeWidth="2.5" strokeDasharray="2 2" />
      <ellipse cx="30" cy="20" rx="6.5" ry="7.5" fill="#FFE0B2" />
      <circle cx="30" cy="16" r="1" fill="#B22222" />
      <circle cx="23" cy="22" r="2" fill="#FFD700" />
      <circle cx="37" cy="22" r="2" fill="#FFD700" />
      <rect x="27" y="26" width="6" height="5" fill="#FFE0B2" />
      <path d="M26 29 Q30 33 34 29" stroke="#FFD700" strokeWidth="2" />
      
      <path d="M20 31 Q30 29 40 31 L42 55 H18 Z" fill="#C62828" />
      
      <path d="M16 55 Q30 50 44 55 L50 160 Q30 165 10 160 Z" fill="#D32F2F" />
      <path d="M20 31 L40 55 L35 160 L15 160 Z" fill="#B71C1C" />
      <path d="M10 155 Q30 160 50 155" stroke="#FFD700" strokeWidth="4" />
      <path d="M20 31 L40 55" stroke="#FFD700" strokeWidth="2" />
    </g>

    <g transform="translate(0, 165)">
      <rect x="30" y="25" width="440" height="8" fill="#8D6E63" rx="2" />
      <rect x="30" y="48" width="440" height="8" fill="#8D6E63" rx="2" />

      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 60 L${x} 10 L${x + 6} 2 L${x + 12} 10 L${x + 12} 60 Z`} fill="#A1887F" stroke="#6D4C41" strokeWidth="1" />
          <circle cx={x + 6} cy={28} r="1.5" fill="#4E342E" />
          <circle cx={x + 6} cy={51} r="1.5" fill="#4E342E" />
        </g>
      ))}
    </g>

    <path d="M0 240 Q40 190 90 220 Q150 180 220 210 Q280 180 340 215 Q420 185 500 240 Z" fill="#2E5A27" />
    <circle cx="50" cy="210" r="4" fill="#FFB74D" />
    <circle cx="120" cy="200" r="4.5" fill="#E57373" />
    <circle cx="380" cy="205" r="4.5" fill="#FFB74D" />
    <circle cx="450" cy="215" r="4" fill="#E57373" />
  </svg>
);

export const GoldFrameCorner = ({
  position,
  color = "#D4AF37",
}) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className="pointer-events-none"
    >
      <path d="M10 90 V20 C10 14, 14 10, 20 10 H90" stroke={color} strokeWidth="3" fill="none" />
      <path d="M20 80 V28 C20 24, 24 20, 28 20 H80" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <circle cx="20" cy="20" r="5" fill={color} />
      <path d="M20 20 L35 35" stroke={color} strokeWidth="2" />
      <path d="M10 40 Q25 25 40 10" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
};

export const BismillahCalligraphySvg = ({
  className = "",
  size = 64,
  color = "#523B68",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M35 45 Q50 20 60 38 Q68 18 78 35 Q85 22 92 42 Q75 52 65 48 Q55 58 45 50 Q38 62 28 50 Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M38 65 C48 55 62 52 72 60 C82 50 92 58 95 68 C80 75 68 70 58 75 C45 78 35 72 38 65 Z"
      fill={color}
    />
    <circle cx="60" cy="22" r="3" fill={color} />
    <circle cx="70" cy="25" r="2.5" fill={color} />
    <circle cx="50" cy="26" r="2.5" fill={color} />
    <path d="M48 82 Q60 88 72 82 Q60 85 48 82 Z" fill={color} />
  </svg>
);

export const GoldRingWreathSvg = ({ className = "" }) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-[240px] mx-auto ${className}`}
  >
    <circle cx="120" cy="120" r="88" stroke="#D4AF37" strokeWidth="2" fill="none" />
    <circle cx="120" cy="120" r="82" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="60 12 20 12" fill="none" />
    
    <g transform="translate(42, 38)">
      <path d="M-10 10 Q-25 -5 -15 -20 Q5 -15 -10 10 Z" fill="#6B8E23" opacity="0.8" />
      <path d="M10 -15 Q25 -25 30 -5 Q15 0 10 -15 Z" fill="#4B6B18" opacity="0.85" />
      <path d="M-20 25 Q-35 20 -30 35 Q-15 35 -20 25 Z" fill="#7C9D32" opacity="0.8" />
      <circle cx="0" cy="0" r="22" fill="#7B1FA2" opacity="0.85" />
      <circle cx="-5" cy="-5" r="16" fill="#9C27B0" opacity="0.9" />
      <circle cx="2" cy="2" r="10" fill="#E1BEE7" opacity="0.95" />
      <circle cx="0" cy="0" r="5" fill="#4A148C" />
      <circle cx="20" cy="-12" r="10" fill="#AB47BC" opacity="0.85" />
      <circle cx="20" cy="-12" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="-18" cy="-14" r="8" fill="#CE93D8" opacity="0.85" />
    </g>

    <g transform="translate(192, 190)">
      <path d="M10 -10 Q25 5 15 20 Q-5 15 10 -10 Z" fill="#6B8E23" opacity="0.8" />
      <path d="M-10 15 Q-25 25 -30 5 Q-15 0 -10 15 Z" fill="#4B6B18" opacity="0.85" />
      <circle cx="0" cy="0" r="20" fill="#8E24AA" opacity="0.85" />
      <circle cx="3" cy="3" r="14" fill="#BA68C8" opacity="0.9" />
      <circle cx="-2" cy="-2" r="8" fill="#F3E5F5" opacity="0.95" />
      <circle cx="0" cy="0" r="4" fill="#4A148C" />
      <circle cx="-16" cy="12" r="9" fill="#9C27B0" opacity="0.8" />
      <circle cx="14" cy="-14" r="7" fill="#E1BEE7" opacity="0.85" />
    </g>
  </svg>
);

export const LavenderTopFloralBanner = () => (
  <svg
    viewBox="0 0 600 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full pointer-events-none"
  >
    <g transform="translate(0, -20)">
      <path d="M0 0 C60 40 120 20 180 60 L0 100 Z" fill="#7B1FA2" opacity="0.12" />
      <circle cx="40" cy="30" r="32" fill="#6A1B9A" opacity="0.7" />
      <circle cx="40" cy="30" r="24" fill="#8E24AA" opacity="0.8" />
      <circle cx="40" cy="30" r="14" fill="#E1BEE7" opacity="0.9" />
      <circle cx="100" cy="20" r="26" fill="#AB47BC" opacity="0.75" />
      <circle cx="100" cy="20" r="18" fill="#CE93D8" opacity="0.85" />
      <circle cx="150" cy="35" r="20" fill="#8E24AA" opacity="0.7" />
      <path d="M80 60 Q120 80 140 50 Q100 40 80 60 Z" fill="#388E3C" opacity="0.7" />
      <path d="M130 15 Q170 30 180 5 Q140 0 130 15 Z" fill="#2E7D32" opacity="0.75" />
      <path d="M160 50 Q200 65 210 40 Q170 30 160 50 Z" fill="#4CAF50" opacity="0.6" />
    </g>

    <g transform="translate(600, -20) scale(-1, 1)">
      <circle cx="40" cy="30" r="32" fill="#6A1B9A" opacity="0.7" />
      <circle cx="40" cy="30" r="24" fill="#8E24AA" opacity="0.8" />
      <circle cx="40" cy="30" r="14" fill="#E1BEE7" opacity="0.9" />
      <circle cx="100" cy="20" r="26" fill="#AB47BC" opacity="0.75" />
      <circle cx="100" cy="20" r="18" fill="#CE93D8" opacity="0.85" />
      <circle cx="150" cy="35" r="20" fill="#8E24AA" opacity="0.7" />
      <path d="M80 60 Q120 80 140 50 Q100 40 80 60 Z" fill="#388E3C" opacity="0.7" />
      <path d="M130 15 Q170 30 180 5 Q140 0 130 15 Z" fill="#2E7D32" opacity="0.75" />
    </g>

    <path d="M180 10 Q300 40 420 10" stroke="#7CB342" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    <circle cx="240" cy="22" r="5" fill="#AB47BC" opacity="0.8" />
    <circle cx="300" cy="26" r="7" fill="#8E24AA" opacity="0.85" />
    <circle cx="360" cy="22" r="5" fill="#AB47BC" opacity="0.8" />
  </svg>
);

export const LavenderBottomFloralBanner = () => (
  <svg
    viewBox="0 0 600 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full pointer-events-none"
  >
    <g transform="translate(0, 140) scale(1, -1)">
      <circle cx="50" cy="30" r="36" fill="#6A1B9A" opacity="0.75" />
      <circle cx="50" cy="30" r="26" fill="#8E24AA" opacity="0.85" />
      <circle cx="50" cy="30" r="15" fill="#F3E5F5" opacity="0.95" />
      <circle cx="120" cy="25" r="28" fill="#AB47BC" opacity="0.8" />
      <circle cx="180" cy="40" r="22" fill="#BA68C8" opacity="0.75" />
      <path d="M90 65 Q140 85 160 55 Q110 45 90 65 Z" fill="#2E7D32" opacity="0.75" />
    </g>

    <g transform="translate(600, 140) scale(-1, -1)">
      <circle cx="50" cy="30" r="36" fill="#6A1B9A" opacity="0.75" />
      <circle cx="50" cy="30" r="26" fill="#8E24AA" opacity="0.85" />
      <circle cx="50" cy="30" r="15" fill="#F3E5F5" opacity="0.95" />
      <circle cx="120" cy="25" r="28" fill="#AB47BC" opacity="0.8" />
      <circle cx="180" cy="40" r="22" fill="#BA68C8" opacity="0.75" />
      <path d="M90 65 Q140 85 160 55 Q110 45 90 65 Z" fill="#2E7D32" opacity="0.75" />
    </g>
  </svg>
);
