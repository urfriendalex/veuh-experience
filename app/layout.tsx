import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { GlobalOverlays } from '@/components/GlobalOverlays';
import { VikingPreloader } from '@/components/VikingPreloader';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'VEUH STUDIO Experience',
  description: 'A two-mode e-commerce birthday experience with a viking theme switch.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      <head>
        <link rel="preload" as="image" href="/preloader/bg.webp" type="image/webp" />
      </head>
      <body>
        <Providers>
          <VikingPreloader />
          {children}
          <GlobalOverlays />
        </Providers>
      </body>
    </html>
  );
}
