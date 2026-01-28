import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Skeleton, Snackbar, Alert, Stack, Box } from "@mui/material";
import { fetchFiles, downloadFileBlob } from "./services/api";
import { processFiles, triggerBrowserDownload } from "./utils/fileUtils";
import Header from "./components/Header";
import Filters from "./components/Filters";
import FileItem from "./components/FileItem";


function App() {
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

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
      <Header />
      
      {/*passage des variable et des setters pour controler les filtres depuis l'enfant*/}
      <Filters
        search={search} setSearch={setSearch}
        sortBy={sortBy} setSortBy={setSortBy}
        filterType={filterType} setFilterType={setFilterType}
      />
      <Stack spacing={2}>
        {isLoading ? (

          //affichage skeleton pendant le chargement
          [1, 2, 3].map((skeletonId) => (
            <Skeleton key={skeletonId} variant="rounded" height={80} sx={{ borderRadius: 4 }} />
          ))
        ) : displayFiles.length === 0 ? (

          <Box sx={{ textAlign: 'center', py: 5, color: '#94a3b8' }}>Aucun document trouvé</Box>
        ) : (

          //affichage des fichiers stocke dans mon tableau 
          displayFiles.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              onDownload={handleDownload}
              downloadingFileName={downloadingName}
            />
          ))
        )
        }
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
