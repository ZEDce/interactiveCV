import React from "react";
import { CvData } from "../../lib/cvParser";
import { Wrench, Tag } from "lucide-react";

interface Props {
  skills: CvData["skills"];
}

const SkillsDisplay: React.FC<Props> = ({ skills }) => {
  // Log the received skills prop for debugging - REMOVED
  // console.log('SkillsDisplay received skills:', skills);

  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-orange-700 mb-3 border-b pb-2 flex items-center">
        <Wrench size={18} className="mr-2 text-orange-500" />
        Zručnosti
      </h3>
      <div className="space-y-3">
        {skills.map((skillCat, index) => (
          <div key={index}>
            <h4 className="text-sm font-medium text-gray-800 mb-1.5">
              {skillCat.category}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skillCat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
                >
                  <Tag size={12} className="mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay;
