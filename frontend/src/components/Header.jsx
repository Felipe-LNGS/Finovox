import { Box, Typography, Stack, Chip } from '@mui/material';

export default function header() {
  <Box sx={{ textAlign: 'center', mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
      <img src='/finovox.svg' alt="Logo Finovox" style={{ height: '35px' }} />
      <Chip
        label="Technical test"
        size="small"
        sx={{ bgcolor: 'var(--_color---lb-30)', color: 'var(--_color---blue)', fontWeight: 'bold' }} />
    </Stack>
    <Typography variant="h3" sx={{
      fontWeight: '900',
      background: 'linear-gradient(135deg, var(--_color---dark) 0%, var(--_color---blue) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 1
    }}>Espace Documents</Typography>
  </Box>
}