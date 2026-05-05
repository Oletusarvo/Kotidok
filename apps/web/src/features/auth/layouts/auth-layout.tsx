import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button';
import { Box, Clock, House } from 'lucide-react';
import { AppScreen } from '../../../components/app-screen';

export function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const homeButtonHref = '/auth/properties';
  return (
    <>
      <div className='flex-1 flex-col w-full max-h-full overflow-hidden'>
        <Outlet />
      </div>
      <div className='bg-primary text-white p-4 w-full z-10 justify-center gap-16'>
        <Button
          disabled={location.pathname === homeButtonHref}
          onClick={() => navigate(homeButtonHref)}
          rounded
          variant='ghost'>
          <House />
        </Button>
      </div>
    </>
  );
}
