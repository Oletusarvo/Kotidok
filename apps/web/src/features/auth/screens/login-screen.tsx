import { Link, useNavigate } from 'react-router-dom';
import { AppScreen } from '../../../components/app-screen';
import { EmailInput, PasswordInput } from '../../../components/input';
import { Button, LoaderButton } from '../../../components/button';
import { useOnSubmit } from '../../../hooks/use-on-submit';
import { ErrorHelperNotice, SuccessHelperNotice } from '../../../components/helper-notice';
import { useSession } from '../providers/session-provider';
import { Modal } from '../../../components/modal';

export function LoginScreen() {
  const navigate = useNavigate();
  const { onSubmit, status, loading, success, error } = useLogin();
  const onClose = () => navigate('/');

  return (
    <Modal
      title='Kirjaudu Sisään'
      onClose={onClose}>
      <form
        className='w-full flex-1 px-2 flex-col gap-2 justify-center'
        onSubmit={onSubmit}>
        <EmailInput />
        <PasswordInput />
        <div className='w-full gap-2'>
          <Button
            disabled={loading || success}
            fullWidth
            variant='outlined'
            onClick={onClose}>
            Peruuta
          </Button>
          <LoaderButton
            loading={loading}
            disabled={loading || success}
            fullWidth
            type='submit'>
            Kirjaudu
          </LoaderButton>
        </div>
        <div className='w-full justify-center mt-4'>
          <Link
            to='/register'
            className='text-primary text-sm'>
            Eikö sinulla ole tiliä? Luo se täällä.
          </Link>
        </div>
        {error ? (
          status === 'auth:invalid-credentials' ? (
            <ErrorHelperNotice>Virheelliset Tunnistautumistiedot!</ErrorHelperNotice>
          ) : (
            <ErrorHelperNotice>Tapahtui odottamaton virhe!</ErrorHelperNotice>
          )
        ) : success ? (
          <SuccessHelperNotice>
            Sisäänkirjautuminen onnistui! Sinut uudelleenohjataan pian...
          </SuccessHelperNotice>
        ) : null}
      </form>
    </Modal>
  );
}

function useLogin() {
  const { login } = useSession();
  const navigate = useNavigate();
  const { onSubmit, status, loading, success, error } = useOnSubmit({
    fetchFn: async credentials => {
      if (!credentials) {
        throw new Error('Credentials missing!');
      }
      return await login(credentials as any);
    },
    onSuccess: () => navigate('/auth/dashboard'),
  });
  return { onSubmit, status, loading, success, error };
}
