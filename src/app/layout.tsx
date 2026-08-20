import { Unbounded, Inter } from 'next/font/google';
import { EntryWrapper } from '../components/EntryWrapper';
import Navbar from '../components/Navbar';
import type { Metadata } from 'next';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-unbounded',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Singularity Student Lab | SRMAP',
  description:
    'The Singularity Advanced Student Research Lab at SRM University AP pioneers innovative research in artificial intelligence, quantum algorithms, spatial computing, and robotics.',
  openGraph: {
    title: 'Singularity Student Lab | SRMAP',
    description:
      'Pioneering research in AI, quantum algorithms, and spatial computing at SRM University AP.',
    url: 'https://singularitylabsrmap.space',
    siteName: 'Singularity Student Lab',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://singularitylabsrmap.space/#organization',

    name: 'Singularity Advanced Student Research Lab',
    alternateName: 'Singularity Student Lab',

    url: 'https://singularitylabsrmap.space/',

    logo: 'https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png',

    description:
      'Student-led advanced research lab at SRM University AP focused on Artificial Intelligence, Quantum Computing, Robotics, Spatial Computing, and Emerging Technologies.',

    founder: {
      '@id': 'https://jayanthramakrishnan.online/#person',
    },

    sameAs: [
      'https://www.linkedin.com/company/singularity-student-lab-srmap/',
      'https://www.instagram.com/thesingularity.srmap/',
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://jayanthramakrishnan.online/#person',

    name: 'Jayanth Ramakrishnan',

    url: 'https://jayanthramakrishnan.online/',

    jobTitle: 'Founder & Chief Executive',

    worksFor: {
      '@id': 'https://singularitylabsrmap.space/#organization',
    },

    sameAs: [
      'https://www.linkedin.com/in/jayanth-ramakrishnan/',
      'https://x.com/jayanth_in',
      'https://www.instagram.com/thejayanthramakrishnan/',
      'https://jayanthramakrishnan.online/',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://singularitylabsrmap.space/#website',

    name: 'Singularity Advanced Student Research Lab',

    url: 'https://singularitylabsrmap.space/',

    publisher: {
      '@id': 'https://singularitylabsrmap.space/#organization',
    },

    inLanguage: 'en',
  };

  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body
        className={`${unbounded.className} bg-black min-h-screen text-white overflow-x-clip`}
      >
        <EntryWrapper>
          <Navbar />

          <div className="min-h-screen">
            {children}
          </div>
        </EntryWrapper>
      </body>
    </html>
  );
}