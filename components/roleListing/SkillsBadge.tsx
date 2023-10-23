import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../ui/Tooltip";
  
  export default function SkillBadge({
    skill,
    hasSkill,
  }: {
    skill: string;
    hasSkill: boolean;
  }) {
    const tooltipText = hasSkill ? (
      <p className="text-gray-600">
        Proficient in{" "}
        <span className="font-medium text-gray-900 underline underline-offset-2">
          {skill}
        </span>
      </p>
    ) : (
      <p className="text-gray-600">
        Missing{" "}
        <span className="font-medium text-gray-900 underline underline-offset-2">
          {skill}
        </span>{" "}
        proficiency
      </p>
    );
  
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded cursor-pointer ${
                hasSkill
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {skill}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-white border">
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  