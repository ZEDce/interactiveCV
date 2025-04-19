import React from 'react';
import { CvData } from '../../lib/cvParser';
import { Award } from 'lucide-react';

interface Props {
  certificates: CvData['certificates'];
}

const CertificatesSection: React.FC<Props> = ({ certificates }) => {
  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2 flex items-center">
        <Award size={20} className="mr-2 text-orange-500" />
        Certifikáty
      </h3>
      <div className="space-y-2">
        {certificates.map((cert, index) => (
          <div key={index} className="text-sm text-gray-700">
             <span className="font-medium">{cert.name}</span>
             <span className="text-xs text-gray-500 ml-1">({cert.date})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesSection; 