import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Skeleton, Snackbar, Alert, Stack, Box, Pagination } from "@mui/material";
import { fetchFiles, downloadFileBlob } from "./services/api";
import { processFiles, triggerBrowserDownload } from "./utils/fileUtils";
import Header from "./components/Header";
import Filters from "./components/Filters";
import FileItem from "./components/FileItem";


function App() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("all");
  const [downloadingName, setDownloadingName] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" })

  const { data: files, isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchFiles();
    }
  });

  //recuperation de la liste a afficher (filtrage + tri)
  const displayFiles = processFiles(files, filterType, search, sortBy);

  //gestion du telechargement via appel API, affichage du spinner et notif (Toast)  
  const handleDownload = async (filename) => {
    try {
      setDownloadingName(filename);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const blob = await downloadFileBlob(filename);
      triggerBrowserDownload(blob, filename);

      setToast({ open: true, message: "Téléchargement réussi !", severity: "success" });
    } catch (error) {
      setToast({ open: true, message: "Erreur lors du téléchargement.", severity: "error" });
    } finally {
      setDownloadingName(null);
    }
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  // reinitialise la page a 1 lors d'un changement de filtre de tri ou de recherch
  useEffect(() => {
    setPage(1);
  }, [filterType, search, sortBy]);

  // decoupage des données pour la pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFiles = displayFiles.slice(startIndex, endIndex);

  //remonte en haut de la page lors du changement de page
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // calcul des lignes vides (ghosts) pour garder une hauteur fixe de la pagination
  const emptyRows = itemsPerPage - paginatedFiles.length;
  const ghostFile = {
    name: "Fantome",
    size: 0,
    last_modified: new Date(),
    type: "ghost"
  };

  return (
    <Container maxWidth="md" sx={{
      mt: 6, mb: 10,
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/*gere le switch de theme et le filtre par type*/}
      <Header
        toggleTheme={toggleTheme} isDarkMode={isDarkMode}
        filterType={filterType} setFilterType={setFilterType}
      />

      {/*gestion de trie par preference et de la recherche de document */}
      <Filters
        search={search} setSearch={setSearch}
        sortBy={sortBy} setSortBy={setSortBy}
      />
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {isLoading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} height={80} sx={{ borderRadius: 4 }} />)
        ) : displayFiles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5, color: 'var(--_color---text-secondary)' }}>
            Aucun document trouvé
          </Box>
        ) : (
          <>
            {/* affichage sur la page actuel des fichiers stocke dans mon tableau */}
            {paginatedFiles.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onDownload={handleDownload}
                downloadingFileName={downloadingName}
              />
            ))}
            {emptyRows > 0 && Array.from(new Array(emptyRows)).map((_, index) => (
              <Box key={`ghost-${index}`} sx={{ visibility: 'hidden' }}>
                <FileItem file={ghostFile} />
              </Box>
            ))}
            {/* definition de la pagination*/}
            {displayFiles.length > itemsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={Math.ceil(displayFiles.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="circular"
                  size="small"
                  siblingCount={0}
                  sx={{
                    // style des boutons INACTIFS (Bordure grise, fond transparent)
                    '& .MuiPaginationItem-root': {
                      color: 'var(--_color---dark)',
                      borderColor: 'rgba(148, 163, 184, 0.3)',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(65, 84, 224, 0.08)',
                        borderColor: 'var(--_color---blue)',
                      }
                    },
                    // style du bouton ACTIF (Fond bleu, Texte blanc)
                    '& .Mui-selected': {
                      backgroundColor: 'var(--_color---blue) !important',
                      color: '#ffffff !important',
                      borderColor: 'var(--_color---blue) !important',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 10px rgba(65, 84, 224, 0.3)'
                    },
                    '& .MuiPaginationItem-previousNext': {
                      borderColor: 'transparent',
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
      {/* affichage des toast selon les valeur defini dans handle download */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} variant="filled" sx={{ borderRadius: 3 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default App;
