import React from 'react';
import { Authenticator, useAuthenticator, View, useTheme, Text } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import './LoginPage.css';

const components = {
  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; 2023 Pomotrackr. All rights reserved.
        </Text>
      </View>
    );
  },
};

function LoginPage() {
  const { route } = useAuthenticator((context) => [context.route]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (route === 'authenticated') {
      navigate('/');
    }
  }, [route, navigate]);

  return (
    <View className="auth-wrapper">
      <Authenticator components={components} />
    </View>
  );
}

export default LoginPage;
