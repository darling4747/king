import { useEffect } from 'react';

export default function useSEO(title, description) {
  useEffect(() => {
    // Dynamically update document title
    document.title = title ? `${title} | JALA Connect` : 'JALA Connect - Bridge to Tech Careers';

    // Dynamically update meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content', 
      description || 'JALA Connect is a professional portal linking IT training academy programs, recruitment partnerships, and job seeker statuses.'
    );
  }, [title, description]);
}
