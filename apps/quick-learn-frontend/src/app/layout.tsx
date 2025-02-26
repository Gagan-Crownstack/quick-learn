import 'flowbite/dist/flowbite.css';
import './global.css';
import { ReduxProvider } from '@src/store/provider';
import ClientWrapper from '@src/shared/components/ClientWrapper';
import ToastWrapper from '@src/shared/components/ToasterWrapper';

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>
          <ClientWrapper />
          <ToastWrapper />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
