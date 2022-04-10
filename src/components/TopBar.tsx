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

const tabs = ['My Team', 'League', 'Marketplace'];

function TopBar({ setCurrentTab }: {setCurrentTab: React.Dispatch<React.SetStateAction<string>>}) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [userName, setUserName] = React.useState('');
    useEffect(() => {
        console.log(Auth.currentUserInfo());
        Auth.currentUserInfo().then((userInfo) => {
            setUserName(userInfo.attributes.name);
        });
    });

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        NFL Calcutta
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {tabs.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => setCurrentTab(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                            {userName}
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
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
