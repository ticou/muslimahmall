import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title,
  description,
  keywords = [],
  image = 'https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c',
  url = window.location.href,
  type = 'website'
}: SEOProps) => {
  const siteName = 'MuslimahMall - Mode Islamique Féminine';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Balises méta de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={[...keywords, 'mode islamique', 'mode modeste', 'hijab', 'abaya'].join(', ')} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Autres balises méta importantes */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <html lang="fr" />
    </Helmet>
  );
};