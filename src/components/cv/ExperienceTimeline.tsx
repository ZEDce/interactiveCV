import React from 'react';
import { CvData, ExperienceEntry } from '../../lib/cvParser';
import { Briefcase } from 'lucide-react';

interface Props {
  experience: CvData['experience'];
}

const ExperienceTimeline: React.FC<Props> = ({ experience }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2 flex items-center">
        <Briefcase size={20} className="mr-2 text-orange-500" />
        Pracovné Skúsenosti
      </h3>
      <div className="relative pl-6 space-y-6 border-l-2 border-orange-200">
        {/* Timeline line */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200" /> */}

        {experience.map((job, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[27px] top-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>

            <p className="text-xs text-gray-500 mb-1">{job.duration}</p>
            <h4 className="text-md font-semibold text-gray-800">{job.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{job.company}</p>
            <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-700">
              {job.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline; 