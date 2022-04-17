import React from 'react';
import { Button } from '@mui/material';
import CreateLeagueModal from './CreateLeagueModal';
import JoinLeagueModal from './JoinLeagueModal';

function Splash() {
    const [joinOpen, setJoinOpen] = React.useState(false);
    const [createOpen, setCreateOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setJoinOpen(true)}>Join League</Button>
            <JoinLeagueModal joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
            <Button onClick={() => setCreateOpen(true)}>Create League</Button>
            <CreateLeagueModal createOpen={createOpen} setCreateOpen={setCreateOpen} />
        </div>
    );
}

export default Splash;
