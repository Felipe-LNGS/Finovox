import { Paper, TextField, FormControl, Select, MenuItem, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Filters({ search, setSearch, sortBy, setSortBy }) {

    return (
        <Paper elevation={0} sx={{
            p: '8px 16px', mb: 3,
            bgcolor: 'var(--_color---white)',
            borderRadius: '50px',
            border: '1px solid transparent',
            boxShadow: 'var(--card-shadow)',
            width: "60%",
            marginLeft: "20%",
            display: 'flex', alignItems: 'center', gap: 2
        }}>
            <SearchIcon sx={{ color: 'var(--_color---blue)' }} />

            {/* met a jour l'etat de 'search' dans le parent */}
            <TextField
                placeholder="Rechercher un document..."
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{
                    flexGrow: 1,
                    '& .MuiInputBase-input': {
                        color: 'var(--_color---dark)',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: 'var(--_color---text-secondary)',
                        opacity: 1,
                    }
                }}
            />

            {/* met a jour l'etat 'sortBy' lors du changement d'option */}
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
                <Select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    disableUnderline
                    sx={{
                        color: 'var(--_color---blue)',
                        fontWeight: 600,
                        '& .MuiSvgIcon-root': {
                            color: 'var(--_color---blue)',
                        }
                    }}
                >
                    <MenuItem value="date">Récent</MenuItem>
                    <MenuItem value="name">Nom</MenuItem>
                    <MenuItem value="size">Taille</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
}