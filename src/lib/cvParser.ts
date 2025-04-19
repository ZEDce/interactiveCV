export interface ContactInfo {
  phone?: string;
  email?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  duration: string;
  details: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
  details?: string[]; // Optional details like participation
}

export interface Certificate {
    name: string;
    date: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string;
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface CvData {
  name: string;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certificates: Certificate[];
  projects: Project[];
  skills: SkillCategory[];
  interests: string[];
}

export function parseCvMarkdown(markdown: string): CvData {
  const data: CvData = {
    name: '',
    contact: {},
    summary: '',
    experience: [],
    education: [],
    certificates: [],
    projects: [],
    skills: [],
    interests: [],
  };

  // Helper to extract text between sections or until EOF
  const extractSection = (startMarker: string, endMarker?: string): string => {
    const startIndex = markdown.indexOf(startMarker);
    if (startIndex === -1) return '';

    let endIndex = -1;
    if (endMarker) {
        endIndex = markdown.indexOf(endMarker, startIndex + startMarker.length);
    }

    const sectionContent = endIndex !== -1
        ? markdown.substring(startIndex + startMarker.length, endIndex)
        : markdown.substring(startIndex + startMarker.length);

    return sectionContent.trim();
  };

  // --- Name ---
  // Find the first line starting with # followed by a space
  const lines = markdown.split('\n');
  for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('# ')) {
          let name = trimmedLine.substring(2).trim(); // Get text after "# "
          // Convert to title case (e.g., "ADAM BARTKO" -> "Adam Bartko")
          name = name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
          data.name = name;
          break; // Stop after finding the first matching line
      }
  }
  // Fallback or error handling if needed (optional)
  if (!data.name) {
      console.warn("CV Parser: Could not find name line starting with '# '");
      // Attempt original regex as a fallback, less reliably
      const nameMatch = markdown.match(/^#\s*(.*?)(\*\*|$)/m); // Use multiline flag maybe?
      if (nameMatch) {
         data.name = nameMatch[1].trim();
      }
  }

  // --- Contact ---
  const contactSection = extractSection('**Kontakt:**', '**Profil / Zhrnutie:**');
  if (contactSection) {
    const lines = contactSection.split('\n').map(l => l.trim());
    lines.forEach(line => {
      if (line.startsWith('-   Telefón:')) data.contact.phone = line.substring(13).trim();
      else if (line.startsWith('-   Email:')) data.contact.email = line.substring(11).trim();
      else if (line.startsWith('-   Lokalita:')) data.contact.location = line.substring(14).trim();
      else if (line.startsWith('-   LinkedIn:')) data.contact.linkedIn = line.substring(14).trim();
      else if (line.startsWith('-   Portfólio:')) data.contact.portfolio = line.substring(15).trim();
    });
  }

  // --- Summary ---
  data.summary = extractSection('**Profil / Zhrnutie:**', '**Pracovné Skúsenosti:**').replace(/\*\*/g, '');

  // --- Experience ---
  const experienceSection = extractSection('**Pracovné Skúsenosti:**', '**Vzdelanie a Profesijný Rozvoj:**');
  if (experienceSection) {
    let currentExperience: ExperienceEntry | null = null;
    const lines = experienceSection.split('\n').map(l => l.trim());
    lines.forEach(line => {
        if (line.startsWith('**') && line.includes('|')) {
            if (currentExperience) data.experience.push(currentExperience);
            const parts = line.split('|').map(p => p.replace(/\*\*/g, '').trim());
            const title = parts[0];
            const company = parts[1];
            const durationMatch = parts[parts.length - 1].match(/\((.*?)\)/);
            const duration = durationMatch ? durationMatch[1] : '';
            currentExperience = { title, company, duration, details: [] };
        } else if (line.startsWith('-   ') && currentExperience) {
            currentExperience.details.push(line.substring(4).trim().replace(/\*\*/g, ''));
        } else if (!line.trim() && currentExperience) {
            // Don't push on empty lines
        }
    });
    if (currentExperience) data.experience.push(currentExperience); // Push last one
  }

  // --- Education ---
  const educationSection = extractSection('**Vzdelanie a Profesijný Rozvoj:**', '**Certifikáty:**');
   if (educationSection) {
    let currentEducation: EducationEntry | null = null;
    const lines = educationSection.split('\n').map(l => l.trim());
    lines.forEach(line => {
        if (line.startsWith('-  ')) { // Main entry
            if (currentEducation) data.education.push(currentEducation);
            const parts = line.substring(3).split(',').map(p => p.trim());
            const degreeMatch = parts[0].match(/(.*?)(?:\((.*?)\))?$/);
            const degree = degreeMatch ? degreeMatch[1].trim().replace(/\*\*/g, '') : parts[0].replace(/\*\*/g, '');
            const institution = parts.length > 1 ? parts[1].replace(/\*\*/g, '') : '';
            const durationMatch = parts[parts.length - 1].match(/\((.*?)\)/);
            const duration = durationMatch ? durationMatch[1] : '';
            currentEducation = { degree, institution, duration, details: [] };
        } else if (line.startsWith('-   ')) { // Sub-detail
            const detailText = line.substring(4).trim().replace(/\*\*/g, '');
            if (currentEducation) {
                 if (!currentEducation.details) currentEducation.details = [];
                 currentEducation.details.push(detailText);
            } else if (data.education.length > 0) {
                const lastEdu = data.education[data.education.length - 1];
                if (!lastEdu.details) lastEdu.details = [];
                lastEdu.details.push(detailText);
            }
        } else if (!line.trim() && currentEducation) {
           // Don't push on empty lines
        }
    });
     if (currentEducation) data.education.push(currentEducation); // Push last one
   }

  // --- Certificates ---
  const certificatesSection = extractSection('**Certifikáty:**', '**Projekty:**');
  if (certificatesSection) {
    const lines = certificatesSection.split('\n').map(l => l.trim());
    lines.forEach(line => {
      if (line.startsWith('-   ')) {
        const item = line.substring(4).trim();
        const dateMatch = item.match(/\((.*?)\)/);
        const date = dateMatch ? dateMatch[1] : '';
        const name = dateMatch ? item.substring(0, dateMatch.index).trim().replace(/\*\*/g, '') : item.replace(/\*\*/g, '');
        data.certificates.push({ name, date });
      }
    });
  }

  // --- Projects ---
  const projectsSection = extractSection('**Projekty:**', '**Zručnosti:**');
  if (projectsSection) {
      data.projects = []; // Ensure array is empty
      const lines = projectsSection.split('\n').map(l => l.trim()).filter(l => l); // Split and remove empty lines
      let currentProject: Project | null = null;

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (line.startsWith('- **')) { // Start of a new project
              // Push the previous project if it exists and is complete
              if (currentProject) {
                  data.projects.push(currentProject);
              }
              
              const titleEndMarker = ':**';
              const titleEndIndex = line.indexOf(titleEndMarker);
              
              if (titleEndIndex !== -1) {
                  const title = line.substring(4, titleEndIndex).trim(); // Extract text between '- **' and ':**'
                  const description = line.substring(titleEndIndex + titleEndMarker.length).trim(); // Extract text after ':**'
                  currentProject = { title, description, tech: '' }; // Initialize new project
              } else {
                  // Handle case where format might be slightly off, e.g., missing '**' at the end
                  const simpleColonIndex = line.indexOf(':');
                  if (simpleColonIndex > 4) {
                     const title = line.substring(4, simpleColonIndex).trim(); 
                     const description = line.substring(simpleColonIndex + 1).trim();
                     currentProject = { title, description, tech: '' }; 
                  } else {
                     currentProject = null; // Invalid start format
                  }
              }
          } else if (line.startsWith('Tech:') && currentProject) {
              currentProject.tech = line.substring(5).trim().replace(/\*\*/g, ''); // Extract tech and clean asterisks
              // We assume Tech: line immediately follows the description line(s)
              // and signifies the end of the current project entry.
              data.projects.push(currentProject);
              currentProject = null; // Reset for the next project block
          } else if (currentProject && !currentProject.tech) {
              // If it's not a new project start and not Tech:, append to description
              currentProject.description += ' ' + line.replace(/\*\*/g, ''); // Append and clean asterisks
          }
      }

      // Push the last project if it wasn't pushed by finding a Tech: line
      // This handles the case where the last project might not have a Tech: line
      // or the loop finished before pushing.
      // Only push if it has a title and wasn't already pushed.
      if (currentProject && currentProject.title && !data.projects.includes(currentProject)) {
          data.projects.push(currentProject);
      }
  }

  // --- Skills ---
  const skillsSection = extractSection('**Zručnosti:**', '**Záujmy:**');
  if (skillsSection) {
      const lines = skillsSection.split('\n').map(l => l.trim());
      data.skills = []; // Ensure the array is initially empty

      lines.forEach((line, lineIndex) => {
          // --- Manual Parsing Approach --- 
          const startMarker = '- **';
          const endMarker = ':**';
          const colonIndex = line.indexOf(':');
          if (line.startsWith(startMarker) && colonIndex > startMarker.length) {
              const category = line.substring(startMarker.length, colonIndex).trim();
              const skillsLine = line.substring(colonIndex + 1).trim();
              
              // Split skills by comma, trim whitespace, filter out empty strings, and remove asterisks
              const skills = skillsLine ? skillsLine.split(',').map(s => s.trim().replace(/\*\*/g, '')).filter(s => s) : [];

              if (skills.length > 0) { // Only push if there are actual skills listed
                  data.skills.push({ category, skills });
              }
          }
          // --- End Manual Parsing ---
      });
  }

  // --- Interests ---
  const interestsSection = extractSection('**Záujmy:**'); // Goes until the end
  if (interestsSection) {
    // Find the first line starting with '- ', remove the marker, trim, and split by comma.
    const lines = interestsSection.split('\n').map(l => l.trim());
    for (const line of lines) {
        if (line.startsWith('- ')) {
            const interestsString = line.substring(2).trim();
            data.interests = interestsString.split(',').map(interest => interest.trim()).filter(interest => interest); // Split, trim, filter empty
            break; // Assume only one line matters for interests
        }
    }
    if (!data.interests || data.interests.length === 0) {
        console.warn("CV Parser: Could not parse interests from line starting with '- '");
        // Fallback: If no line starts with '- ', maybe the section itself is the list?
        // This is less likely based on current format, but as a safety net:
        const fallbackInterests = interestsSection.split(',').map(i => i.trim()).filter(i => i);
        if (fallbackInterests.length > 0) data.interests = fallbackInterests;
    }
  }

  return data;
}

// Optional: You could export the raw markdown content from here too
// export const rawCvMarkdown = `... your markdown ...`;
// Then import it in page.tsx 