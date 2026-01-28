import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

//recupere la liste des fichiers (JSON) depuis le serveur
export const fetchFiles = async () =>{
    const response = await axios.get(`${API_URL}/api/files`);
    return response.data;
}
//telecharge le CONTENU BINAIRE du fichier (Blob) et non du texte pour eviter d'endommager le fichier lors du telechargement via l'API
export const downloadFileBlob = async (filename) =>{
    const response = await axios.get(`${API_URL}/download/${filename}`,{
        responseType: 'blob',
    });
    return response.data;
}