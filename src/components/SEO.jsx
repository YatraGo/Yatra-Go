import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title,
  description,
  keywords,
  ogImage = 'https://www.yatrago.com/assets/logo.png',
  ogType = 'website',
  schemaData = null,
}) => {
  const location = useLocation();
  const siteUrl = 'https://www.yatrago.com';
  
  // Resolve canonical URL. Handle HashRouter legacy paths as well just in case, but default to BrowserRouter path.
  let cleanPath = location.pathname;
  if (cleanPath.startsWith('/#/')) {
    cleanPath = cleanPath.substring(2);
  }
  const canonicalUrl = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;

  const defaultTitle = 'Yatra Go - Premium Travel & Tour Packages | Haridwar, Uttarakhand';
  const defaultDescription = 'Yatra Go delivers high-impact tour packages, pilgrimage journeys, adventure activities, taxi services, and hotel bookings across Uttarakhand, Himachal Pradesh, and Kashmir.';
  const defaultKeywords = 'Travel Agency in Haridwar, Best Travel Agency in Haridwar, Uttarakhand Tour Packages, Taxi Service in Haridwar, Char Dham Yatra Package 2026, Kedarnath Tour Package, Rishikesh River Rafting';

  const metaTitle = title ? `${title} | Yatra Go` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* General Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
