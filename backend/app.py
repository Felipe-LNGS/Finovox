import os
from datetime import datetime
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #autorise tout le monde a parler avec l'api (MODE DEV)

FILES_DIRECTORY = os.path.join(os.getcwd(), 'files')

if not os.path.exists(FILES_DIRECTORY):
    os.makedirs(FILES_DIRECTORY)

#gestion des routes api pour que react ai acces 
@app.route('/api/files', methods=['GET'])
def list_files():
    files_list = []

    try:
        for filename in os.listdir(FILES_DIRECTORY):
            full_path = os.path.join(FILES_DIRECTORY, filename)
            
            if os.path.isfile(full_path):
                stats = os.stat(full_path)
                #formatage de la date au format ISO
                formatted_date = datetime.fromtimestamp(stats.st_mtime).strftime('%Y-%m-%dT%H:%M:%SZ')
                
                files_list.append({
                    "name": filename,
                    "size": stats.st_size,
                    "last_modified": formatted_date
                })
        #permet de retourner en format JSON
        return jsonify(files_list)
    except Exception as e:
        return jsonify({"error":str(e)}), 500
    
#gestion de la route pour le download
@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    #utilisation de send_from pour eviter de remonter dans les dossiers systeme 
    return send_from_directory(FILES_DIRECTORY, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)