import os
from datetime import datetime
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #autorise tout le monde a parler avec l'api (MODE DEV)

DOSSIER_FICHIERS = os.path.join(os.getcwd(), 'files')

if not os.path.exists(DOSSIER_FICHIERS):
    os.makedirs(DOSSIER_FICHIERS)

#gestion des routes api pour que react ai acces 
@app.route('/api/files', methods=['GET'])
def liste_fichiers():
    mes_fichiers = []

    try:
        for nom_fichier in os.listdir(DOSSIER_FICHIERS):
            chemin_complet = os.path.join(DOSSIER_FICHIERS, nom_fichier)
            
            if os.path.isfile(chemin_complet):
                stats = os.stat(chemin_complet)
                #formatage de la date au format ISO
                date_formater = datetime.fromtimestamp(stats.st_mtime).strftime('%Y-%m-%dT%H:%M:%SZ')
            mes_fichiers.append({
                "name": nom_fichier,
                "size": stats.st_size,
                "last_modified": date_formater
            })
        #permet de retourner en format JSON
        return jsonify(mes_fichiers)
    except Exception as e:
        return jsonify({"error":str(e)}), 500
    
#gestion de la route pour le download
@app.route('/download/<path:nom_du_fichier>', methods=['GET'])
def telecharger(nom_du_fichier):
    #utilisation de send_from pour eviter de remonter dans les dossiers systeme 
    return send_from_directory(DOSSIER_FICHIERS, nom_du_fichier, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)