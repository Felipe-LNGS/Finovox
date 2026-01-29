# File Downloader – Finovox 

## 1. Présentation rapide du projet

Application web **React + Flask** permettant de **lister, filtrer et télécharger** des fichiers depuis un dossier serveur local.

**Fonctionnalités implémentées** :
- 🔍 Recherche en temps réel
- 📂 Tri par type (Texte/Images/PDF/Autres)
- 📥 Téléchargement sécurisé
- 🔢 Pagination
- 🌙 Dark Mode (activé par défaut)
- 📱 Responsive mobile

**Inspiration** : Charte colorimétrique officielle Finovox

---

## 2. Instructions d'installation

### Pré-requis

- Node.js 18+
- Python 3.9+
- pip

### Installation des dépendances

```bash
npm run setup
```

> Installe automatiquement toutes les dépendances (racine + frontend)

**Backend Python** :

```bash
cd backend
pip install flask flask-cors
```

---

## 3. Commandes pour lancer

### Lancer tout (backend + frontend)

À la racine du projet :

```bash
npm start
```

**Résultat** :
- Backend : http://localhost:5000
- Frontend : http://localhost:3000

### Scripts disponibles

```bash
npm run start:backend      # Backend Flask uniquement
npm run start:frontend     # Frontend React uniquement
npm run test               # Tests backend + frontend
```

---

## 4. Exemples d'appels API

### Récupérer la liste des fichiers

```
GET http://localhost:5000/api/files
```

**Réponse** :

```json
[
  {
    "name": "test.pdf",
    "size": 15234,
    "last_modified": "2026-01-29T15:00:00Z"
  },
  {
    "name": "image.png",
    "size": 45678,
    "last_modified": "2026-01-29T14:30:00Z"
  }
]
```

### Télécharger un fichier

```
GET http://localhost:5000/download/test.pdf
```

> Télécharge directement le fichier demandé

---

## 5. Procédure pour exécuter les tests

### Lancer tous les tests

À la racine du projet :

```bash
npm test
```

> Lance **pytest** (backend) + **Jest** (frontend) en parallèle

### Tests séparés

```bash
npm run test:backend    # Tests backend uniquement
npm run test:frontend   # Tests frontend uniquement
```

---

## 6. Choix techniques & UX

### Backend Flask

**Pourquoi Flask** :
- API légère et simple
- CORS intégré avec `flask-cors`
- `send_from_directory` sécurisé (empêche remontée dossiers)

**Sécurité** : `send_from_directory` empêche l'accès aux dossiers parents

### Frontend React + MUI

**Pourquoi React + MUI** :
- MUI = composants modernes + responsive + SEO optimisé (balises Google)
- Dark mode intégré
- Toolbar avec recherche, tri et pagination
- Meilleur référencement Google (balisage sémantique)

**Implémentations UX** :
- **Dark Mode** : Activé par défaut pour confort visuel
- **Toolbar** : Recherche + onglets catégories (Texte/Images/PDF/Autres)
- **Pagination** : Évite pages trop longues
- **Responsive** : Mobile-first avec breakpoints MUI
- **Icônes** : Nuage (↓) par fichier pour télécharger

---

## 🚀 Quick Start

```bash
# 1. Installation complète
npm run setup

# 2. Backend Python (optionnel si déjà installé)
cd backend && pip install flask flask-cors && cd ..

# 3. Lancer l'application
npm start
```

**L'app est prête à** : http://localhost:3000

---

## 📁 Structure du projet

```
FINOVOX/
├── backend/
│   ├── files/                  # Fichiers à télécharger
│   ├── app.py                  # API Flask
│   └── test_api.py             # Tests backend
├── frontend/
│   ├── public/                 # Assets statiques
│   ├── src/
│   │   ├── assets/
│   │   │   ├── finovox.svg     # Logo Finovox
│   │   │   └── react.svg       # Logo React
│   │   ├── components/
│   │   │   ├── FileItem.jsx    # Composant fichier
│   │   │   ├── Filters.jsx     # Composant filtres
│   │   │   └── Header.jsx      # Entête app
│   │   ├── services/
│   │   │   └── api.js          # Appels API
│   │   ├── utils/
│   │   │   └── fileUtils.js    # Utilitaires fichiers
│   │   ├── App.jsx             # Composant principal
│   │   ├── App.test.jsx        # Tests frontend
│   │   ├── index.css           # Styles globaux
│   │   └── main.jsx            # Point d'entrée
│   ├── package.json            # Dépendances React
│   └── vite.config.js          # Config Vite
├── package.json                # Scripts racine
└── README.md
```

---

