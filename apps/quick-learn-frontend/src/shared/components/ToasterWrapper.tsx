import { ToastContainer } from 'react-toastify';
export default function ToastWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      pauseOnFocusLoss={false}
    />
  );
}
