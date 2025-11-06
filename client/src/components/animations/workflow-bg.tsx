import { useEffect, useRef } from "react";

export default function WorkflowBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Add animation classes to paths after mount
    const paths = svg.querySelectorAll('path');
    paths.forEach((path, index) => {
      path.style.animationDelay = `${index * 0.5}s`;
      path.classList.add('animate-pulse');
    });

    const circles = svg.querySelectorAll('circle');
    circles.forEach((circle, index) => {
      circle.style.animationDelay = `${index * 0.3}s`;
      circle.classList.add('animate-pulse');
    });
  }, []);

  return (
    <div className="workflow-animation">
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 600" 
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217 91% 35%)" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        
        {/* Connection lines */}
        <g stroke="url(#nodeGradient)" strokeWidth="2" fill="none">
          <path d="M100,200 Q300,150 500,200 T900,250" />
          <path d="M150,350 Q400,300 650,350 T1000,400" />
          <path d="M200,100 Q500,50 800,100" />
        </g>
        
        {/* Workflow nodes */}
        <g fill="url(#nodeGradient)">
          <circle cx="100" cy="200" r="8" />
          <circle cx="500" cy="200" r="10" />
          <circle cx="900" cy="250" r="8" />
          <circle cx="150" cy="350" r="6" />
          <circle cx="650" cy="350" r="10" />
          <circle cx="1000" cy="400" r="8" />
        </g>
      </svg>
    </div>
  );
}
