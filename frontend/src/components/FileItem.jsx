import { Paper, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, IconButton, CircularProgress } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { getFileType, formatSize } from '../utils/fileUtils';

export default function FileItem({ file, onDownload, downloadingFileName }) {

    //affichage de l'icon selon le type de fichier
    const getIconComponent = (filename) => {
        const type = getFileType(filename);
        if (type === 'image') return <ImageIcon />;
        if (type === 'pdf') return <PictureAsPdfIcon />;
        return <InsertDriveFileIcon />;
    };
    //verifie si le fichier a telecharger correspond au nom du fichier si oui->true 
    const isDownloading = downloadingFileName === file.name;

    return (
        <Paper elevation={0} sx={{
            p: 2, borderRadius: 4, bgcolor: 'var(--_color---white)',
            transition: '0.2s', border: '1px solid transparent',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--card-hover)', borderColor: 'var(--_color---lb-30)' }
        }}>
            <ListItem disablePadding>
                <ListItemAvatar>

                    {/* affichage de l'icon */}
                    <Avatar variant="rounded" sx={{ bgcolor: 'var(--_color---lb-30)', color: 'var(--_color---blue)', borderRadius: 3 }}>
                        {getIconComponent(file.name)}
                    </Avatar>
                </ListItemAvatar>

                {/* formatage pour la taille en octet et formatage de la date */}
                <ListItemText
                    primary={<Typography fontWeight="700" color="var(--_color---dark)">{file.name}</Typography>}
                    secondary={`${formatSize(file.size)} • ${new Date(file.last_modified).toLocaleDateString()}`}
                />
                <IconButton
                    onClick={() => onDownload(file.name)}
                    disabled={isDownloading}
                    aria-label={`Télécharger ${file.name}`}
                    sx={{
                        color: 'var(--_color---blue)', border: '1px solid var(--_color---lb-30)', borderRadius: 3,
                        '&:hover': { bgcolor: 'var(--_color---blue)', color: 'var(--_color---white)' }
                    }}
                >
                    {/* affiche le Spinner OU l'icon de telechargement */}
                    {isDownloading ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />}
                </IconButton>
            </ListItem>
        </Paper>
    );
}