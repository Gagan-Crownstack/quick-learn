import 'flowbite/dist/flowbite.css';
import './global.css';
import { ToastContainer } from 'react-toastify';
import { ReduxProvider } from '@src/store/provider';
import { getClientIp } from '@src/apiServices/ipService';

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // Fetch client IP at app initialization
  if (typeof window !== 'undefined') {
    getClientIp().catch((error) =>
      console.error('Error preloading client IP:', error),
    );
  }

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            pauseOnFocusLoss={false}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
