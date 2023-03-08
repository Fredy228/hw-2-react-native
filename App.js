import { useState } from 'react';
import { LoginScreen } from './assets/Screens/LoginScreen';
import { RegistrationScreen } from './assets/Screens/RegistrationScreen';

export default function App() {
  const [isScreen, setIsScreen] = useState(true);

  if (!isScreen) {
    return <RegistrationScreen setIsScreen={setIsScreen} />;
  }
  return <LoginScreen setIsScreen={setIsScreen} />;
}
