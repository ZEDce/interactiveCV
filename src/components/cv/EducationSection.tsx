import React from 'react';
import { CvData } from '../../lib/cvParser';
import { GraduationCap } from 'lucide-react';

interface Props {
  education: CvData['education'];
}

const EducationSection: React.FC<Props> = ({ education }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2 flex items-center">
        <GraduationCap size={20} className="mr-2 text-orange-500" />
        Vzdelanie a Rozvoj
      </h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <p className="text-xs text-gray-500 mb-0.5">{edu.duration}</p>
            <h4 className="text-md font-semibold text-gray-800">{edu.degree}</h4>
            <p className="text-sm text-gray-600 mb-1">{edu.institution}</p>
            {edu.details && edu.details.length > 0 && (
               <ul className="list-disc list-outside pl-5 space-y-1 text-xs text-gray-700">
                 {edu.details.map((detail, i) => (
                   <li key={i}>{detail}</li>
                 ))}
               </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection; 