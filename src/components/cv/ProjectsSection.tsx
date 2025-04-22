import React from "react";
import { CvData } from "../../lib/cvParser";
import { Lightbulb } from "lucide-react";

interface Props {
  projects: CvData["projects"];
}

const ProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2 flex items-center">
        <Lightbulb size={20} className="mr-2 text-orange-500" />
        Projekty
      </h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index}>
            <h4 className="text-md font-semibold text-gray-800 mb-1">
              {project.title}
            </h4>
            <p className="text-sm text-gray-700 mb-1">{project.description}</p>
            <p className="text-xs text-gray-500">
              <span className="font-medium">Tech:</span> {project.tech}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
