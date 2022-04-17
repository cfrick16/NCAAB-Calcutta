import React from 'react';
import {
    Autocomplete,
    Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { API } from 'aws-amplify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const getGroup = () => {
    API.get('Groups', '/groups', {}).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.response);
    });
};
function JoinLeagueModal({ joinOpen, setJoinOpen }:
                               {joinOpen: boolean, setJoinOpen: any}) {
    return (
        <div>
            <Modal
                open={joinOpen}
                onClose={() => setJoinOpen(false)}
            >
                <Box sx={style}>
                    <Typography margin="normal">Joining a League</Typography>
                    <Autocomplete
                        disablePortal
                        options={[]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="League Name" />}
                    />
                    <Button onClick={getGroup}>Join</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default JoinLeagueModal;
