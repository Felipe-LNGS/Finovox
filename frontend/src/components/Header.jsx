import React from 'react';
import { Box, Switch, Stack, Paper, Button } from '@mui/material';
import LogoFinovox from '../assets/finovox.svg';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Header({ toggleTheme, isDarkMode, filterType, setFilterType }) {

    // options du menu des categforie
    const navItems = [
        { id: 'all', label: 'Tout' },
        { id: 'image', label: 'Images' },
        { id: 'pdf', label: 'PDFs' },
        { id: 'other', label: 'Autres' }
    ];

    return (
        <Box sx={{ mb: 6 }}>

            {/* nav bar */}
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '10px 20px',
                    borderRadius: '16px',
                    bgcolor: 'var(--_color---white)',
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                {/*Gestion du logo*/}
                <Box
                    component="img"
                    src={LogoFinovox}
                    alt="Logo Finovox"
                    sx={{
                        height: '26px',
                        width: 'auto',
                        filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none',
                        transition: 'filter 0.3s ease',
                        cursor: 'pointer'
                    }}
                />

                {/* affichage des differents filtres par categorie dans la nav bbar */}
                <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <Stack direction="row" spacing={1}>
                        {navItems.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => setFilterType(item.id)}
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    px: 2,
                                    minWidth: 'auto',
                                    color: filterType === item.id ? 'var(--_color---blue)' : 'var(--_color---text-secondary)',
                                    position: 'relative',
                                    backgroundColor: 'transparent !important',
                                    '&:hover': {
                                        color: 'var(--_color---blue)',
                                    },
                                    '&::after': filterType === item.id ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '20px',
                                        height: '2px',
                                        bgcolor: 'var(--_color---blue)',
                                        borderRadius: '2px'
                                    } : {}
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                </Box>
                {/* affichae du bouton de switch dark/light */}
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'var(--_color---text-secondary)' }}>
                    <Brightness7Icon sx={{ fontSize: 18 }} />
                    <Switch checked={isDarkMode} onChange={toggleTheme} size="small" />
                    <Brightness4Icon sx={{ fontSize: 18 }} />
                </Stack>
            </Paper>
        </Box>
    );
}