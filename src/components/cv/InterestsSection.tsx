import React from 'react';
import { CvData } from '../../lib/cvParser';
import { Smile, Tag } from 'lucide-react';

interface Props {
  interests: CvData['interests'];
}

const InterestsSection: React.FC<Props> = ({ interests }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-orange-700 mb-3 border-b pb-2 flex items-center">
        <Smile size={18} className="mr-2 text-orange-500" />
        Záujmy
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {Array.isArray(interests) && interests.map((interest, index) => (
           <span
             key={index}
             className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
           >
             <Tag size={12} className="mr-1" />
             {interest}
           </span>
        ))}
      </div>
    </div>
  );
};

export default InterestsSection; 