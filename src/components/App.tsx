import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import TopBar from './TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
