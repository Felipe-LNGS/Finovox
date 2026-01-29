// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FileItem from './components/FileItem';
import { Alert } from '@mui/material';

// Configuration rapide
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('Vérification Rapide', () => {
    //test pour verifier les donnees de la liste
    it('Affiche le nom et la taille calculée', () => {
        const monFichier = { 
            name: "test.pdf", 
            size: 1024,
            last_modified: "2024-01-01" 
        };

        render(<FileItem file={monFichier} onDownload={() => {}} />);
        expect(screen.getByText('test.pdf')).toBeInTheDocument();        
        expect(screen.getByText(/1.0 Ko/)).toBeInTheDocument(); 
    });
    //test pour verifier les messages d'erreur 

    it('Affiche correctement un message d\'erreur', () => {
        render(<Alert severity="error">Impossible de charger la liste</Alert>);
        expect(screen.getByText('Impossible de charger la liste')).toBeInTheDocument();
    });
});