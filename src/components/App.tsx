import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

import { useSelector } from 'react-redux';
import { API, Auth } from 'aws-amplify';
import { Button } from '@mui/material';
import TopBar from './TopBar';
import MyTeam from './MyTeam';
import { RootState } from '../redux/store';
import CreateJoinLeague from './groupComponents/CreateJoinLeague';

function App() {
    const callApi = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;

        const requestData = { headers: { Authorization: token } };
        console.log(requestData);
        const data = await API.get('Groups', '/groups', requestData);
        console.log(data);
    };

    const currentTab = useSelector((state:RootState) => state.website.currentTab);
    const getTab = () => {
        switch (currentTab) {
        case 'My Team':
            return (<MyTeam />);
        case 'Create/Join League':
            return (<CreateJoinLeague />);
        default:
            return (<></>);
        }
    };
    return (
        <div>
            <Button onClick={callApi}>Call APi</Button>
            <TopBar />
            {getTab()}
        </div>
    );
}

export default withAuthenticator(App);
