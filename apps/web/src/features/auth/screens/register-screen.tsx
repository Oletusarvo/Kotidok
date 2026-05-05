import { AppScreen } from '../../../components/app-screen';
import { EmailInput, PasswordInput } from '../../../components/input';
import { Link, useNavigate } from 'react-router-dom';
import { Button, LoaderButton } from '../../../components/button';
import { useOnSubmit } from '../../../hooks/use-on-submit';
import { apiInterface } from '../../../utils/api-interface';
import { ErrorHelperNotice, SuccessHelperNotice } from '../../../components/helper-notice';
import { Modal } from '../../../components/modal';

export function RegisterScreen() {
  const navigate = useNavigate();
  const onClose = () => navigate('/');
  const { onSubmit, loading, success, error, status } = useRegister();
  const buttonsDisabled = loading || success;

  return (
    <Modal
      title='Rekisteröidy'
      onClose={onClose}>
      <form
        className='flex-1 flex-col gap-2 w-full justify-center'
        onSubmit={onSubmit}>
        <EmailInput />
        <PasswordInput autoComplete='new-password' />
        <PasswordInput
          repeat
          autoComplete='new-password'
        />
        <div className='w-full items-center justify-between'>
          <span>Hyväksyn palveluehdot</span>
          <input
            type='checkbox'
            name='tosAccepted'
            required
          />
        </div>
        <div className='gap-2 w-full'>
          <Button
            disabled={buttonsDisabled}
            fullWidth
            variant='outlined'
            onClick={onClose}>
            Peruuta
          </Button>

          <LoaderButton
            type='submit'
            loading={loading}
            disabled={buttonsDisabled}
            shadow
            fullWidth>
            Rekisteröidy
          </LoaderButton>
        </div>
        <div className='justify-center w-full mt-4'>
          <Link
            to='/login'
            className='text-primary text-sm'>
            Onko sinulla jo tili? Kirjaudu sisään.
          </Link>
        </div>
        {error ? (
          status === 'auth:email-taken' ? (
            <ErrorHelperNotice>
              Tili antamallesi sähköpostiosoitteelle on jo olemassa!
            </ErrorHelperNotice>
          ) : (
            <ErrorHelperNotice>Tapahtui odottamaton virhe!</ErrorHelperNotice>
          )
        ) : success ? (
          <SuccessHelperNotice>Rekisteröityminen onnistui!</SuccessHelperNotice>
        ) : null}
      </form>
    </Modal>
  );
}

function useRegister() {
  const navigate = useNavigate();
  const { loading, status, onSubmit, success, error } = useOnSubmit({
    fetchFn: async payload => {
      return await apiInterface.registerUser(payload);
    },
    onSuccess: () => navigate('/auth/login'),
  });
  return { onSubmit, status, loading, success, error };
}
