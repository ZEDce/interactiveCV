"use client";

import React from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvContent: string;
}

const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, cvContent }) => {
  if (!isOpen) return null;

  // Remove the start/end markers for display
  const displayContent = cvContent
    .replace("--- ZAČIATOK CV ---", "")
    .replace("--- KONIEC CV ---", "")
    .trim();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Zavrieť"
        >
          <X size={24} />
        </button>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default CvModal; 