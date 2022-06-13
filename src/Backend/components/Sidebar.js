import React from 'react';
import { Box, Divider, Drawer, Typography, Button } from '@mui/material';
import { FaTachometerAlt, FaChalkboardTeacher, FaGraduationCap, FaUserGraduate, FaUsersCog, FaUsers, FaBookOpen, FaUserCheck, FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';
import NavItem from './NavItem';
import Logo from './Logo';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const items = [
    {
        href: '',
        title: "Dashboard",
        icon: <FaTachometerAlt />

    },
    {
        href: 'students',
        title: "Students",
        icon: <FaUsers />

    },
    {
        href: 'subjects',
        title: "Subject",
        icon: <FaBookOpen />
    },
    // {
    //     href: 'timetable',
    //     title: "Time Table",
    //     icon: <FaRegClock />
    // },

];


const Sidebar = ({ user, onClose }) => {
    let resolved = useResolvedPath('profile');
    let isProfileActive = useMatch({ path: resolved.pathname, end: true });

    const content = (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Box sx={{ p: 3 }}>
                    <Logo />
                </Box>
                <Box sx={{ px: 2 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: 3,
                            py: '11px',
                            borderRadius: 1
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle1"
                            >
                                Welcome, {user.username}
                            </Typography>
                            <Typography
                                color="light.main"
                                variant="body2"
                            >

                            </Typography>
                        </div>
                        <Button
                            variant='outlined'
                            color='light'
                            sx={{ ml: 1 }}
                            component={Link}
                            to={'profile'}
                            disabled={isProfileActive ? true : false}
                        >
                            Profile
                        </Button>
                    </Box>
                </Box>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                    {(user.role.includes('ROLE_SUPERADMIN') || user.role.includes('ROLE_ADMIN'))
                        && <>
                            <NavItem
                                icon={<FaChalkboardTeacher />}
                                href={'teachers'}
                                title={"Teachers"}
                            />
                            <NavItem
                                icon={<FaGraduationCap />}
                                href={'faculties'}
                                title={"Faculty"}
                            />
                            <NavItem
                                icon={<FaUserGraduate />}
                                href={'departments'}
                                title={"Department"}
                            />
                        </>
                    }
                    {/* {(user.role.includes('ROLE_SUPERADMIN') || user.role.includes('ROLE_TEACHER'))
                        && <NavItem
                            icon={<FaUserCheck />}
                            href={'attendance'}
                            title={"Attendance"}
                        />
                    } */}
                    {(user.role.includes('ROLE_SUPERADMIN') || user.role.includes('ROLE_ACCOUNTANT'))
                        && <NavItem
                            icon={<FaRegMoneyBillAlt />}
                            href={'fee'}
                            title={"Fee"}
                        />
                    }
                    {user.role.includes('ROLE_SUPERADMIN')
                        && <NavItem
                            icon={<FaUsersCog />}
                            href={'usermanagement'}
                            title={"User Management"}
                        />
                    }
                </Box>
            </Box>
        </>
    );

    return (
        <Drawer
            anchor="left"
            open
            PaperProps={{
                sx: {
                    backgroundColor: 'dark.main',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            variant="permanent"
        >
            {content}
        </Drawer>
    );
}

export default Sidebar