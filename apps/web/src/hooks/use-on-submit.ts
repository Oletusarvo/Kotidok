import { useStatus } from './use-status';

export type useOnSubmitProps = {
  /**The function to run when submitting */
  fetchFn: (payload?: Record<string, any>) => Promise<Response>;
  /**The function to run when the fetch responds with a status in the 200-299 range. */
  onSuccess?: <T>(data?: T) => void | Promise<void>;
  /**The function to run when the fetch responds with a status in the 400-range, or 500. */
  onError?: (err: any) => void | Promise<void>;
  /**The function to run if the fetchFn throws an error. */
  onException?: (err: any) => void | Promise<void>;
};

export function useOnSubmit({ fetchFn, onSuccess, onError, onException }: useOnSubmitProps) {
  const { status, setStatus, loading, success, error } = useStatus();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setStatus('loading');
      const payload = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetchFn(payload);
      if (res.status === 200) {
        const data = await res.json();
        await onSuccess?.(data);
        setStatus('success');
      } else {
        const err = await res.json();
        await onError?.(err);
        setStatus(err.error);
      }
    } catch (err: any) {
      await onException?.(err);
      setStatus('error');
    } finally {
      setStatus(prev => (prev === 'loading' ? 'idle' : prev));
    }
  };

  return { status, loading, success, error, onSubmit };
}
