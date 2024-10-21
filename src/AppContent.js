import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import MenuButton from './MenuButton';

function AppContent() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="App">
      <header>
        <MenuButton isOpen={false} onClick={() => {}} />
        <h1 className="app-title">POMOTRACKR</h1>
      </header>
      <main>
        <h2>Welcome to POMOTRACKR</h2>
        <p>Your productivity app is ready!</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </main>
    </div>
  );
}

export default AppContent;
