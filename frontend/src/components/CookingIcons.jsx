import React from 'react';

// Cooking-themed SVG components
export const EggIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3C9.5 3 7 7 7 12C7 17 9 21 12 21C15 21 17 17 17 12C17 7 14.5 3 12 3Z" 
          fill="#E9A268" stroke="#D4A76A" strokeWidth="1" />
  </svg>
);

export const WhiskIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 4C6 4 10 8 12 12C14 16 18 20 18 20" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6C8 6 12 10 14 14C16 18 20 22 20 22" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 2L20 22" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 6L6 3" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CupcakeIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 10C7 7.79086 8.79086 6 11 6H13C15.2091 6 17 7.79086 17 10V14H7V10Z" fill="#5D4037" />
    <path d="M6 14H18L17 18H7L6 14Z" fill="#5D4037" />
    <path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6H9Z" fill="#E9A268" />
    <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14" stroke="#E9A268" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const HerbIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3V21" stroke="#6B8E6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 10C12 10 15 7 18 10" stroke="#6B8E6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 14C12 14 9 11 6 14" stroke="#6B8E6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 6C12 6 9 3 6 6" stroke="#6B8E6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 18C12 18 15 15 18 18" stroke="#6B8E6B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const StarIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="#E9A268" stroke="#D4A76A" strokeWidth="1" />
  </svg>
);

export const BowlIcon = ({ className = "", size = 24, fillColor = "#A9A9A9" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10Z" 
          fill="transparent" stroke={fillColor} strokeWidth="1.5" />
    <path d="M8 10C8 10 9 12 12 12C15 12 16 10 16 10" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SpoonIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4Z" 
          stroke="#A9A9A9" strokeWidth="1.5" />
    <path d="M12 12L12 20" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AIIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="#E9A268" />
  </svg>
);

export const ChartIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 4H20V20H4V4Z" stroke="#D4A76A" strokeWidth="1.5" />
    <path d="M4 16L8 12L12 16L20 8" stroke="#E9A268" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Decorative background elements
export const DecorativeCorner = ({ className = "", position = "top-left" }) => {
  let positionClasses = "";
  
  switch(position) {
    case "top-left":
      positionClasses = "top-0 left-0 -translate-x-1/4 -translate-y-1/4";
      break;
    case "top-right":
      positionClasses = "top-0 right-0 translate-x-1/4 -translate-y-1/4";
      break;
    case "bottom-left":
      positionClasses = "bottom-0 left-0 -translate-x-1/4 translate-y-1/4";
      break;
    case "bottom-right":
      positionClasses = "bottom-0 right-0 translate-x-1/4 translate-y-1/4";
      break;
    default:
      positionClasses = "top-0 left-0";
  }
  
  return (
    <div className={`absolute ${positionClasses} opacity-20 ${className}`}>
      <div className="w-32 h-32 bg-amber-500/20 rounded-full blur-md"></div>
    </div>
  );
};

export const DecorativePattern = ({ className = "" }) => (
  <div className={`absolute inset-0 opacity-5 pointer-events-none ${className}`}>
    <div className="absolute top-10 left-10">
      <WhiskIcon size={60} className="text-amber-300" />
    </div>
    <div className="absolute top-20 right-20">
      <EggIcon size={40} className="text-amber-300" />
    </div>
    <div className="absolute bottom-10 left-1/4">
      <HerbIcon size={50} className="text-amber-300" />
    </div>
    <div className="absolute bottom-20 right-1/3">
      <StarIcon size={30} className="text-amber-300" />
    </div>
    <div className="absolute top-1/3 left-20">
      <CupcakeIcon size={45} className="text-amber-300" />
    </div>
  </div>
);

// Card components with cooking theme
export const CookingThemedCard = ({ 
  children, 
  className = "", 
  icon = "bowl",
  title,
  subtitle,
  onClick
}) => {
  const renderIcon = () => {
    switch(icon) {
      case "egg": return <EggIcon size={32} className="text-amber-400" />;
      case "whisk": return <WhiskIcon size={32} className="text-amber-400" />;
      case "cupcake": return <CupcakeIcon size={32} className="text-amber-400" />;
      case "herb": return <HerbIcon size={32} className="text-amber-400" />;
      case "star": return <StarIcon size={32} className="text-amber-400" />;
      case "bowl": return <BowlIcon size={32} className="text-amber-400" />;
      case "spoon": return <SpoonIcon size={32} className="text-amber-400" />;
      case "ai": return <AIIcon size={32} className="text-amber-400" />;
      case "chart": return <ChartIcon size={32} className="text-amber-400" />;
      default: return <BowlIcon size={32} className="text-amber-400" />;
    }
  };

  return (
    <div 
      className={`relative overflow-hidden bg-gray-800 rounded-lg border border-amber-700/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-amber-500/10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 -mb-6 -ml-6 bg-amber-500/10 rounded-full"></div>
      
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          {renderIcon()}
        </div>
        <div className="flex-1">
          {title && <h3 className="text-xl font-bold text-amber-100 mb-1">{title}</h3>}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
          <div className="mt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Feature components
export const AIFeatureCard = ({ title, description, icon = "ai", className = "", onClick }) => (
  <CookingThemedCard 
    icon={icon}
    title={title}
    subtitle={description}
    className={`border-l-4 border-l-amber-500 ${className}`}
    onClick={onClick}
  >
    <div className="mt-4 flex items-center">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900 text-amber-300">
        AI Powered
      </span>
      <span className="ml-2 text-sm text-gray-400">Click to explore</span>
    </div>
  </CookingThemedCard>
);

// Badge components
export const CookingBadge = ({ text, icon = "star", className = "" }) => {
  const renderIcon = () => {
    switch(icon) {
      case "egg": return <EggIcon size={16} className="mr-1" />;
      case "whisk": return <WhiskIcon size={16} className="mr-1" />;
      case "cupcake": return <CupcakeIcon size={16} className="mr-1" />;
      case "herb": return <HerbIcon size={16} className="mr-1" />;
      case "star": return <StarIcon size={16} className="mr-1" />;
      case "bowl": return <BowlIcon size={16} className="mr-1" />;
      case "spoon": return <SpoonIcon size={16} className="mr-1" />;
      default: return <StarIcon size={16} className="mr-1" />;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-amber-300 ${className}`}>
      {renderIcon()}
      {text}
    </span>
  );
};

export default {
  EggIcon,
  WhiskIcon,
  CupcakeIcon,
  HerbIcon,
  StarIcon,
  BowlIcon,
  SpoonIcon,
  AIIcon,
  ChartIcon,
  DecorativeCorner,
  DecorativePattern,
  CookingThemedCard,
  AIFeatureCard,
  CookingBadge
};
