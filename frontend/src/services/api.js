import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// attend la reponse du backend via Axios et retourne uniquement les donnees JSON utiles
export const fetchFiles = async () =>{
    const response = await axios.get(`${API_URL}/api/files`);
    return response.data;
}
//obtention de l'url de download via le fichier passe en parametre et l'adresse API
export const getDownloadUrl = (filename) =>{
    return `${API_URL}/download/${filename}`;
}