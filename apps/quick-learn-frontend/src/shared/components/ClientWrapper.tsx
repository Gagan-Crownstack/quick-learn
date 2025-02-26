'use client';
import { getClientIp } from '@src/apiServices/ipService';
import { useEffect } from 'react';

export default function ClientWrapper() {
  useEffect(() => {
    getClientIp().catch((error) =>
      console.error('Error preloading client IP:', error),
    );
  }, []);

  return null; // No UI, just for running client-side effects
}
