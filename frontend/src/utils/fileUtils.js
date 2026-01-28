//retourne le type de fichier(pdf, image, other) selon le fichier envoyé
export const getFileType = (filename) => {
    if(!filename) return 'unknown';
    const extension = filename.split('.').pop().toLowerCase();

    if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(extension)) {
    return 'image';
    }
    if (['pdf'].includes(extension)) {
        return 'pdf';
    }
    return 'other';
}
//formate les octets en chaines lisibles
export const formatSize = (bytes) => {
    if (bytes === 0) return '0 o';
    if (bytes < 1024) return bytes + ' o';

    return (bytes / 1024).toFixed(1) + ' Ko';
};

//filtre et trie la liste des fichiers
export const processFiles = (files, filterType, searchText, sortOption) => {
    if(!files) return[];

    let processedList = [...files];

    if(filterType !== 'all' ){
        processedList = processedList.filter(file => getFileType(file.name) === filterType);
    }
    if (searchText) {
        processedList = processedList.filter(file => 
        file.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    processedList.sort((fileA, fileB) =>{
    if(sortOption === 'name')
        return fileA.name.localeCompare(fileB.name);
    if (sortOption === 'size')
        return fileB.size - fileA.size;
    return new Date(fileB.last_modified) - new Date(fileA.last_modified);
    });

    return processedList;
}
//declenche le telechargement du fichier dans le navigateur via un lien temporaire invisible
export const triggerBrowserDownload = (blobData, filename) => {
  const url = window.URL.createObjectURL(new Blob([blobData]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

