import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/icon.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Charts from './Charts';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import { getUser } from '../../utils/helpers';
import { Grid2 } from '@mui/material';

const drawerWidth = 240;

const COLORS = {
    primary: "#30b9b2",
    primary1: "#00fff53c",
    secondary: "#ffa44f",
    secondary1: "#ffe5db",
    tertiary: "#0078a6",
    gray: "#83829A",
    gray2: "#C1C0C8",
    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: " #00C135",
    lightWhite: "#FAFAFC",
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: COLORS.offwhite,
        height: '100vh',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard() {
    const navigate = useNavigate();
    const [openCharts, setOpenCharts] = React.useState(true);
    const [openUsers, setOpenUsers] = React.useState(false);
    const [openProducts, setOpenProducts] = React.useState(false);
    const user = getUser();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={true} sx={{ backgroundColor: COLORS.white, boxShadow: 'none' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box component="img" src={user.profile.url} sx={{ height: 40, width: 40, borderRadius: 99, mr: 1 }} />
                    <Typography sx={styles.userName}>{user.username.split(' ').slice(0, 2).join(' ')}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={true}
            >
                <DrawerHeader sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                    <Box component="img" src={logo} sx={{ height: 40, width: 40 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: COLORS.primary, fontFamily: 'bold', cursor: 'pointer', mt: 1 }} onClick={() => navigate('/')}>
                        HalalExpress
                    </Typography>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ my: 2 }}>
                        <ListItemButton onClick={() => {
                            setOpenCharts(!openCharts);
                            setOpenUsers(false);
                            setOpenProducts(false);
                        }}>
                            <ListItemIcon>
                                <InsertChartOutlinedIcon />
                            </ListItemIcon>
                            <Typography sx={{ fontFamily: 'regular' }}>Charts</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ my: 2 }}>
                        <ListItemButton onClick={() => {
                            setOpenUsers(!openUsers);
                            setOpenCharts(false);
                            setOpenProducts(false);
                        }}>
                            <ListItemIcon>
                                <PersonOutlineOutlinedIcon />
                            </ListItemIcon>
                            <Typography sx={{ fontFamily: 'regular' }}>Users</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ my: 2 }}>
                        <ListItemButton onClick={() => {
                            setOpenProducts(!openProducts);
                            setOpenCharts(false);
                            setOpenUsers(false);
                        }}>
                            <ListItemIcon>
                                <Inventory2OutlinedIcon />
                            </ListItemIcon>
                            <Typography sx={{ fontFamily: 'regular' }}>Products</Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={true}>
                {openCharts && <Charts />}
                {openUsers && <ManageUsers />}
                {openProducts && <ManageProducts />}
            </Main>
        </Box>
    );
}


const styles = {
    userIcon: {
        color: COLORS.primary,
        fontSize: 30
    },
    userName: {
        color: COLORS.black,
        fontFamily: 'bold',
        fontSize: 16,
        ml: 1
    },
};