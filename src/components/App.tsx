import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

import TopBar from './TopBar';
import MyTeam from './MyTeam';

function App() {
    const [currentTab, setCurrentTab] = React.useState('My Team');
    const getTab = () => {
        switch (currentTab) {
        case 'My Team':
            return (<MyTeam />);
        default:
            return (<></>);
        }
    };
    return (
        <div>
            {currentTab}
            <TopBar setCurrentTab={setCurrentTab} />
            {getTab()}
        </div>
    );
}

export default withAuthenticator(App);
