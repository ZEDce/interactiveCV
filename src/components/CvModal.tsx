"use client";

import React from "react";
import { X } from "lucide-react";
// import ReactMarkdown from 'react-markdown'; // Removed
import { CvData } from "../lib/cvParser"; // Import CvData type

// Import CV section components
import ContactInfo from "./cv/ContactInfo";
import SummarySection from "./cv/SummarySection";
import ExperienceTimeline from "./cv/ExperienceTimeline";
import SkillsDisplay from "./cv/SkillsDisplay";
import EducationSection from "./cv/EducationSection";
import ProjectsSection from "./cv/ProjectsSection";
import CertificatesSection from "./cv/CertificatesSection";
import InterestsSection from "./cv/InterestsSection";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CvData; // Changed from cvContent: string
}

const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, cvData }) => {
  if (!isOpen || !cvData) return null; // Check for cvData as well

  // Removed cleanup logic for markdown markers

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal on backdrop click
    >
      {/* Modal Content Container */}
      <div
        className="bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/50">
          <h2 className="text-xl font-semibold text-orange-600">Životopis</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Zavrieť"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body with Scrolling */}
        <div className="flex-grow overflow-y-auto p-6">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column (Sidebar) */}
            <div className="md:col-span-1 space-y-6">
              <ContactInfo contact={cvData.contact} name={cvData.name} />
              <SkillsDisplay skills={cvData.skills} />
              <InterestsSection interests={cvData.interests} />
            </div>

            {/* Right Column (Main Content) */}
            <div className="md:col-span-2 space-y-6">
              <SummarySection summary={cvData.summary} />
              <ExperienceTimeline experience={cvData.experience} />
              <EducationSection education={cvData.education} />
              <ProjectsSection projects={cvData.projects} />
              <CertificatesSection certificates={cvData.certificates} />
            </div>
          </div>
        </div>

        {/* Optional Modal Footer */}
        {/* <div className="p-4 border-t border-gray-200 bg-gray-50/50 text-right"> */}
        {/*   <button onClick={onClose} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Zavrieť</button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CvModal;
