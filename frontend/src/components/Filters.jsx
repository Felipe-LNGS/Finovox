import { Paper, TextField, FormControl, Select, MenuItem, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//gere l'affichage de la barre de recherche du tri et des filtres
export default function Filters({ search, setSearch, sortBy, setSortBy, filterType, setFilterType }) {
    const filterOptions = [
        { id: 'all', label: 'Tout' },
        { id: 'image', label: 'Images' },
        { id: 'pdf', label: 'PDFs' },
        { id: 'other', label: 'Autres' }

    ];

    return (
        <>
            <Paper elevation={0} sx={{
                p: '8px 16px', mb: 3,
                bgcolor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)',
                borderRadius: '50px', border: '1px solid white', boxShadow: 'var(--card-shadow)',
                display: 'flex', alignItems: 'center', gap: 2
            }}>
                <SearchIcon sx={{ color: 'var(--_color---blue)' }} />
                {/* met a jour l'etat de 'search' dans le parent */}
                <TextField
                    placeholder="Rechercher..." variant="standard"
                    InputProps={{ disableUnderline: true }} sx={{ flexGrow: 1 }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                {/* met a jour l'etat 'sortBy' lors du changement d'option */}
                <FormControl variant="standard" sx={{ minWidth: 100 }}>
                    <Select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        disableUnderline
                        sx={{ color: 'var(--_color---blue)', fontWeight: 600 }}
                    >
                        <MenuItem value="date">Récent</MenuItem>
                        <MenuItem value="name">Nom</MenuItem>
                        <MenuItem value="size">Taille</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
            {/* iteration dans la map filterOptions pour permettre d'afficher les 4 options et de savoir laquelle est selectionné */}
            <Stack direction="row" spacing={1} sx={{ mb: 4, justifyContent: 'center' }}>
                {filterOptions.map((option) => (
                    <Chip
                        key={option.id}
                        label={option.label}
                        onClick={() => setFilterType(option.id)}
                        sx={{
                            bgcolor: filterType === option.id ? 'var(--_color---blue)' : 'var(--_color---white)',
                            color: filterType === option.id ? 'var(--_color---white)' : 'var(--_color---dark)',
                            fontWeight: 600, border: '1px solid',
                            borderColor: filterType === option.id ? 'transparent' : '#e2e8f0',
                            '&:hover': { bgcolor: filterType === option.id ? 'var(--_color---blue)' : '#f1f5f9' }
                        }}
                    />
                ))}
            </Stack>
        </>
    );
}