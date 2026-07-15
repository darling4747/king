import React from 'react';
import useSEO from '../hooks/useSEO';

export default function SEO({ title, description }) {
  useSEO(title, description);
  return null; // This is a utility wrapper component that returns nothing to the DOM
}
