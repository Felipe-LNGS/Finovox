import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFiles, getDownloadUrl } from "./services/api";
import { Container, Typography, List, ListItem, ListItemText, IconButton, Paper, Alert, Avatar, ListItemAvatar, CircularProgress, Box, Chip } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function App() {
  //utilisation de reactQuery pour lancer fetchFiles et gestion automatiques des etats (chargemnet, erreur ... )
  const { data: files, isLoading, isError, error } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles,
  });


  //-----FONCTION DE FORMATAGE-----

  //declenche le telechargement via getDownloadUrl et le fichier passe en parametre
  const handleDownload = (filename) => {
    window.location.href = getDownloadUrl(filename);
  }

  //permet de formater les bytes lu en 'ko' ou 'o' (1024 -> 1.0 ko)
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' o';
    return (bytes / 1024).toFixed(1) + ' Ko';
  }

  // permet de formater la date (ex: 2025-01-27T... -> 27 janvier 2025)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  //------INTERFACE-------

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'var(--_color---blue)', fontWeight: 'bold' }}>
        📂 Mes Documents
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Erreur : {error.message} - Verifie que le terminal python est lancé
        </Alert>
      )}

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'var(--_color---light-bg)' }}>

            {files && files.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                <Typography>Aucun fichier trouvé dans le dossier backend/files</Typography>
              </Box>
            ) : (
              files?.map((file, index) => (
                <ListItem
                  key={index}
                  divider={index !== files.length - 1}
                  secondaryAction={
                    <IconButton color="primary" onClick={() => handleDownload(file.name)}>
                      <CloudDownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'var(--_color---light-blue)', color: 'var(--_color---blue)' }}>
                      <InsertDriveFileIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Box component="span" sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center' }}>
                        <Chip label={formatSize(file.size)} size="small" variant="outlined" />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Modifié le {formatDate(file.last_modified)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default App;