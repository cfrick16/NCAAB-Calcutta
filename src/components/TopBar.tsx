import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { setCurrentLeague, setCurrentTab } from '../redux/actions';
import { RootState } from '../redux/store';

const tabs = ['My Team', 'League', 'Marketplace'];
const leagues = ['League1', 'League2', 'League3'];

function TopBar() {
    const dispatch = useDispatch();
    const currentLeague = useSelector((state:RootState) => state.website.currentLeague);
    const [anchorElLeague, setAnchorElLeague] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [userName, setUserName] = React.useState('');
    useEffect(() => {
        console.log(Auth.currentUserInfo());
        Auth.currentUserInfo().then((userInfo) => {
            setUserName(userInfo.attributes.name);
        });
    });

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        onClick={() => dispatch(setCurrentTab('Create/Join League'))}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: 'flex' }}
                        >
                            NCAAB Calcutta
                        </Typography>
                    </Button>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={(event) => setAnchorElLeague(event.currentTarget)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                            >
                                {currentLeague !== '' ? currentLeague : 'SELECT A LEAGUE'}
                                <ArrowDropDownIcon sx={{ color: 'white' }} />
                            </div>
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElLeague}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            open={Boolean(anchorElLeague)}
                            onClose={() => setAnchorElLeague(null)}
                        >
                            {leagues.map((league) => (
                                <MenuItem onClick={() => dispatch(setCurrentLeague(league))}>
                                    <Typography textAlign="center">
                                        {league}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {tabs.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => dispatch(setCurrentTab(page))}
                                disabled={currentLeague === ''}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={(event) => setAnchorElUser(event.currentTarget)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {userName}
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            <MenuItem>
                                <Typography textAlign="center">
                                    Account
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => Auth.signOut()}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default TopBar;
