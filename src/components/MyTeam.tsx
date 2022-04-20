import React from 'react';
import { Box } from '@mui/material';
import { API } from 'aws-amplify';
import { getHeaders } from '../common/apiHelper';

function MyTeam() {
    getHeaders().then((header) => {
        API.get('tournamentInfo', '/teams/Kansas', { headers: header }).then((res) => {
            console.log(res);
        });
    });
    return (
        <div>
            <Box />
        </div>
    );
}

export default MyTeam;
