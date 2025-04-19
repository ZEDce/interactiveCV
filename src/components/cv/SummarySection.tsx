import React from 'react';
import { CvData } from '../../lib/cvParser';
import { FileText } from 'lucide-react'; // Or other relevant icon

interface Props {
  summary: CvData['summary'];
}

const SummarySection: React.FC<Props> = ({ summary }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-orange-700 mb-3 border-b pb-2 flex items-center">
         <FileText size={20} className="mr-2 text-orange-500" />
         Profil / Zhrnutie
      </h3>
      {/* Render summary paragraphs */}
      {typeof summary === 'string' && summary.trim() ? (
         summary.split('\n').map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-700 mb-2 last:mb-0">
              {paragraph}
            </p>
          ))
      ) : (
         <p className="text-sm text-gray-500 italic">Zhrnutie nie je k dispozícii.</p> // Fallback message
      )}
    </div>
  );
};

export default SummarySection; 