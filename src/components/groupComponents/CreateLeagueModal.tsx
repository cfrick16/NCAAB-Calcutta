import React, { useState } from 'react';
import {
    Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { API } from 'aws-amplify';
import { getCurrentUser, getHeaders } from '../../common/apiHelper';
import { addGroupToUser } from '../../common/apiCalls';

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

function CreateLeagueModal({ createOpen, setCreateOpen }:
                               {createOpen: boolean, setCreateOpen: any}) {
    const [groupName, setGroupName] = useState('');
    const [entryCost, setEntryCost] = useState('');

    const createLeagueOnClick = async () => {
        const data = await API.put('groupsApi', '/groups', {
            headers: await getHeaders(),
            body: {
                groupName,
                entryCost,
                owner: await getCurrentUser(),
            },
        });
        console.log(data);
        await addGroupToUser(groupName);
        setCreateOpen(false);
    };
    return (
        <div>
            <Modal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            >
                <Box sx={style}>
                    <Typography>Create a League</Typography>
                    <TextField
                        label="League Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Entry Cost"
                        value={entryCost}
                        onChange={(e) => setEntryCost(e.target.value)}
                        margin="normal"
                    />
                    <Button onClick={createLeagueOnClick}>
                        Create League
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateLeagueModal;
