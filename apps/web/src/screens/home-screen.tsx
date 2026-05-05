import { Link, Outlet, Route, useNavigate } from 'react-router-dom';
import { RegisterScreen } from '../features/auth/screens/register-screen';
import { CreateComponentScreen } from '../features/components/screens/create-component-screen';
import { Box, File, History, Home, House, LogIn, User } from 'lucide-react';
import { Button } from '../components/button';
import { AppScreen } from '../components/app-screen';
import { PassProps } from '../components/pass-props';
import type { ReactNode } from 'react';

export function HomeScreen() {
  const navigate = useNavigate();
  return (
    <>
      <Outlet />
      <div className='flex-1 w-full flex-col bg-olive-50'>
        <section className='flex-col gap-8 w-full items-center py-32 px-4 relative bg-hero bg-cover bg-center'>
          <div className='w-full bg-linear-to-b from-white/50 to-white absolute top-0 left-0 h-full' />
          <div className='flex-col gap-8 w-full z-10 items-center animate-app-screen'>
            <Home
              size='4rem'
              color='var(--color-secondary)'
            />
            <div className='flex-col items-center'>
              <h1 className='text-slate-700 font-semibold text-3xl'>Kotidok</h1>
              <p className='text-slate-700 text-center'>
                Komponenttigraafipohjainen kiinteistönhallintajärjestelmä.
              </p>
            </div>

            <div className='w-full gap-2'>
              <Button
                onClick={() => navigate('/register')}
                fullWidth>
                <User size='1rem' />
                Rekisteröidy
              </Button>

              <Button
                onClick={() => navigate('/login')}
                variant={'outlined'}
                fullWidth>
                <LogIn size='1rem' />
                Kirjaudu Sisään
              </Button>
            </div>
          </div>
        </section>
        <section className='py-16 flex-col px-4 w-full bg-secondary text-white h-full'>
          <h2 className='font-semibold text-2xl mb-4'>Mikä Kotidok?</h2>
          <p>
            Kotidok on innovatiivinen kiinteistönhallintajärjestelmä, joka perustuu
            komponenttipohjaiseen arkkitehtuurin. Unohda paperipinot, sotkuiset arkistot ja aikaa
            vievä paperisotkun säilytys – kaikki tiedot ovat digitaalisesti järjestettyinä, helposti
            haettavissa ja reaaliaikaisesti päivitettävissä. Jokainen komponentti voi reagoida
            tapahtumiin, mikä tekee järjestelmästä dynaamisen ja automatisoidun. Hallinnoi
            kiinteistöjäsi tehokkaasti ilman fyysistä paperisotkua, säästä aikaa ja vähennä
            virheitä!
          </p>
        </section>

        <section className='px-4 py-16 w-full h-full flex-col'>
          <h2 className='font-semibold text-2xl mb-4'>Toiminnot</h2>

          <ul className='flex-col gap-2 w-full'>
            <ListItem
              title='Kiinteistöt'
              icon={<Home />}>
              Luo kiinteistö antamalla yleistiedot. Näiden pohjalta luodaan ensimmäiset komponentit.
            </ListItem>
            <ListItem
              title='Komponentit'
              icon={<Box />}>
              Lisää kiinteistölle komponentteja, tietopaketteja jotka kuvaavat talon osia, kuten
              huoneita, lämmitysjärjestelmiä tai ikkunoita.
            </ListItem>
            <ListItem
              title='Tapahtumat'
              icon={<History />}>
              Pidä kirjaa kiinteistölle ja sen osille tehdyistä muutoksista, kuten remonteista,
              huolloista tai maalauksista.
            </ListItem>
            <ListItem
              title='Tiedostot'
              icon={<File />}>
              Liitä kiinteistölle, komponenteille ja tapahtumille kuvia ja asiakirjoja täydentämään
              niiden tietoja.
            </ListItem>
          </ul>
        </section>
      </div>
    </>
  );
}

function ListItem({
  icon,
  title,
  children,
}: React.PropsWithChildren & { icon: ReactNode; title: string }) {
  const iconElement = (
    <PassProps
      size='var(--text-lg)'
      color='var(--color-primary)'>
      {icon}
    </PassProps>
  );

  return (
    <li className='shadow-md w-full rounded-xl p-4 gap-4 bg-white'>
      <div className='h-full w-0.5 bg-primary grow-0 shrink-0' />
      <div className='flex-col'>
        <div className='gap-2 items-center'>
          {iconElement}
          <h3 className='text-lg font-semibold text-slate-500'>{title}</h3>
        </div>

        <p className='text-sm'>{children}</p>
      </div>
    </li>
  );
}
