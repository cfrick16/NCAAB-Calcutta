import React from 'react';
import {
    Autocomplete, Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { API } from 'aws-amplify';

const allLeagues = ['League1', 'LEague2'];

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
function CreateJoinLeague() {
    const [joinOpen, setJoinOpen] = React.useState(false);
    const [createOpen, setCreateOpen] = React.useState(false);

    const getGroup = () => {
        API.get('Groups', '/groups', {}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error.response);
        });
    };
    return (
        <div>
            <Button onClick={() => setJoinOpen(true)}>Join League</Button>
            <Modal
                open={joinOpen}
                onClose={() => setJoinOpen(false)}
            >
                <Box sx={style}>
                    <Typography margin="normal">Joining a League</Typography>
                    <Autocomplete
                        disablePortal
                        options={allLeagues}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="League Name" />}
                    />
                    <Button onClick={getGroup}>Join</Button>
                </Box>
            </Modal>
            <Button onClick={() => setCreateOpen(true)}>Create League</Button>
            <Modal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            >
                <Box sx={style}>
                    <Typography>Create a League</Typography>
                    <TextField label="League Name" variant="outlined" margin="normal" />
                    <TextField label="Entry Cost" variant="outlined" margin="normal" />
                    <Button>
                        Create League
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateJoinLeague;
