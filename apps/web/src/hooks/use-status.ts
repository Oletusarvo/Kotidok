import { useState } from 'react';

export function useStatus() {
  const [status, setStatus] = useState('idle');
  const loading = status === 'loading';
  const success = status === 'success';
  const error = status !== 'loading' && status !== 'idle';
  return { status, setStatus, loading, success, error };
}
