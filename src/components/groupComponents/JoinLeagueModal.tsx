import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
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
function JoinLeagueModal({ joinOpen, setJoinOpen }:
                               {joinOpen: boolean, setJoinOpen: any}) {
    const [groups, setGroups] = useState<any[]>([]);
    const [groupName, setGroupName] = useState('');
    const joinGroup = async () => {
        await API.put(
            'groupsApi',
            `/groups/${groupName}`,
            { headers: await getHeaders(), body: { newMember: await getCurrentUser() } },
        );
        await addGroupToUser(groupName);
        setJoinOpen(false);
    };
    useEffect(() => {
        // Get list of all groups
        getHeaders().then((header) => {
            API.get('groupsApi', '/groups', { headers: header }).then((res) => {
                setGroups(JSON.parse(res.body));
            });
        });
    }, []);
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
                        onChange={(e, value) => setGroupName(value)}
                        options={groups}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="League Name" />}
                    />
                    <Button onClick={joinGroup}>Join</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default JoinLeagueModal;
