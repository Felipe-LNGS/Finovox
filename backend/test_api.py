from app import app

# initialisation du bot testeur 
client = app.test_client()

# test pour voir si on arrive a recuperer la liste doit retourner 200
def test_liste():
    response = client.get('/api/files')
    assert response.status_code == 200
    assert isinstance(response.json, list)

# test d'un fichier existant doit retourner 200
def test_files():
    response = client.get('/download/test.txt')
    assert response.status_code == 200

# test d'un fichier inexistant doit retourner 404
def test_wrong_files():
    response = client.get('/download/fake.pdf')
    assert response.status_code == 404