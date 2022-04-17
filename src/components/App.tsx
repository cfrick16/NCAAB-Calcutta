import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

import { useSelector } from 'react-redux';
import TopBar from './TopBar';
import MyTeam from './MyTeam';
import { RootState } from '../redux/store';
import Splash from './groupComponents/Splash';

function App() {
    const currentTab = useSelector((state:RootState) => state.website.currentTab);
    const getTab = () => {
        switch (currentTab) {
        case 'My Team':
            return (<MyTeam />);
        case 'Create/Join League':
            return (<Splash />);
        default:
            return (<></>);
        }
    };
    return (
        <div>
            <TopBar />
            {getTab()}
        </div>
    );
}

export default withAuthenticator(App);
