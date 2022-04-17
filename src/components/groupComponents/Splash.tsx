import React from 'react';
import { Button } from '@mui/material';
import { API } from 'aws-amplify';
import CreateLeagueModal from './CreateLeagueModal';
import JoinLeagueModal from './JoinLeagueModal';
import { getHeaders } from '../../common/apiHelper';

const testButton = async () => {
    const res = await API.get('groupsApi', '/groups', { headers: await getHeaders() });
    console.log(res);
};

function Splash() {
    const [joinOpen, setJoinOpen] = React.useState(false);
    const [createOpen, setCreateOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setJoinOpen(true)}>Join League</Button>
            <JoinLeagueModal joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
            <Button onClick={() => setCreateOpen(true)}>Create League</Button>
            <CreateLeagueModal createOpen={createOpen} setCreateOpen={setCreateOpen} />
            <Button onClick={testButton}>Test Button</Button>
        </div>
    );
}

export default Splash;
