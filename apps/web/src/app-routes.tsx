import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens/home-screen';
import { RegisterScreen } from './features/auth/screens/register-screen';
import { LoginScreen } from './features/auth/screens/login-screen';
import { AuthLayout } from './features/auth/layouts/auth-layout';
import { ComponentScreen } from './features/components/screens/component-screen';
import {
  NotFoundErrorScreen,
  NotImplementedErrorScreen as NotImplementedScreen,
} from './screens/error-screen';
import { ComponentChildrenScreen } from './features/components/screens/component-children-screen';
import { PropertyListScreen } from './features/properties/screens/property-list-screen';
import { ComponentEventsScreen } from './features/components/screens/component-events.screen';

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<HomeScreen />}>
          <Route
            path='login'
            element={<LoginScreen />}
          />

          <Route
            path='register'
            element={<RegisterScreen />}
          />
        </Route>

        <Route
          path='/auth'
          element={<AuthLayout />}>
          <Route
            path='dashboard'
            element={<NotImplementedScreen title='Dashboard' />}
          />
          <Route
            path='properties'
            element={<PropertyListScreen />}></Route>

          {/**The route where the user chooses to create a new component or event for a property. */}
          <Route
            path='components/create'
            element={<NotImplementedScreen title='Create new component' />}
          />

          {/*Should use a specialized component-screen to render, as properties are just components anyway. */}
          <Route
            path='components/:id'
            element={<ComponentScreen />}>
            <Route
              path='children'
              element={<ComponentChildrenScreen />}
            />
            <Route
              path='events'
              element={<ComponentEventsScreen />}
            />
            <Route
              path='files'
              element={<NotImplementedScreen title='Component files' />}
            />
          </Route>
        </Route>
        <Route
          path='*'
          element={<NotFoundErrorScreen />}
        />
      </Routes>
    </>
  );
}
