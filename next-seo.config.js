const canonicalUrl = 'https://anishmane.com';
const metaImage = '';
const metaDescription =
  'Seasoned Software Engineer especially in Frontend side, with a passion for creating pixel-perfect web experiences';

const defaultSEOConfig = {
  defaultTitle: 'Anish Mane',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Anish Mane',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'anishmane.com og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'anishmane.com og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'anishmane.com og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'anishmane.com',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
