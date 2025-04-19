import React from 'react';
import { CvData } from '../../lib/cvParser';
import { Phone, Mail, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

interface Props {
  contact: CvData['contact'];
  name: string;
}

const ContactInfo: React.FC<Props> = ({ contact, name }) => {
  // Helper for Portfolio link or other generic links (optional)
  const createLink = (url: string | undefined) => {
    if (!url || url.startsWith('[')) return null;
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return (
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-orange-600 transition-colors break-all"
      >
        {url.replace(/^https?:\/\//, '')} {/* Display cleaner URL */}
      </a>
    );
  };

  // Helper specifically for LinkedIn display
  const getLinkedInProfilePath = (url: string | undefined): string => {
      if (!url || url.startsWith('[')) return '';
      try {
          const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
          let path = urlObj.pathname;
          // Remove potential leading/trailing slashes and split
          const parts = path.split('/').filter(Boolean);
          // Typically the profile path is after '/in/'
          const inIndex = parts.indexOf('in');
          if (inIndex !== -1 && parts.length > inIndex + 1) {
              return parts[inIndex + 1];
          }
          // Fallback if /in/ not found or no part after it
          return parts.length > 0 ? parts[parts.length - 1] : ''; 
      } catch (e) {
          console.error("Error parsing LinkedIn URL for display:", e);
          return ''; // Return empty string on error
      }
  };
  
  const linkedInProfilePath = getLinkedInProfilePath(contact.linkedIn);
  const fullLinkedInUrl = contact.linkedIn && contact.linkedIn.startsWith('http') ? contact.linkedIn : `https://${contact.linkedIn}`;


  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-orange-700 mb-3 border-b pb-2">{name}</h3>
      <div className="space-y-2 text-sm text-gray-700">
        {contact.phone && (
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-orange-500 flex-shrink-0" />
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-orange-600 transition-colors">{contact.phone}</a>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-orange-500 flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="hover:text-orange-600 transition-colors break-all">{contact.email}</a>
          </div>
        )}
        {contact.location && (
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-orange-500 flex-shrink-0" />
            <span>{contact.location}</span>
          </div>
        )}
        {contact.linkedIn && linkedInProfilePath && (
          <div className="flex items-center space-x-2">
            <Linkedin size={16} className="text-orange-500 flex-shrink-0" />
            <a
              href={fullLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition-colors break-all"
            >
              LinkedIn
            </a>
          </div>
        )}
        {createLink(contact.portfolio) && (
          <div className="flex items-center space-x-2">
            <LinkIcon size={16} className="text-orange-500 flex-shrink-0" />
            {createLink(contact.portfolio)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo; 