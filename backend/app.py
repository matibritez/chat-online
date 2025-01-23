from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

# Simulación de base de datos
users = {}

def generate_unique_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Faltan campos obligatorios"}), 400

    # Generar ID único de 6 caracteres
    user_id = generate_unique_id()
    while user_id in users:  # Asegurar que el ID no esté duplicado
        user_id = generate_unique_id()

    # Guardar usuario en la base de datos simulada
    users[user_id] = {"username": username, "password": password}
    print(f"Usuario registrado: {username}, ID: {user_id}")

    return jsonify({"success": True, "message": "Usuario registrado", "id": user_id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Buscar usuario por username
    user = next((u for u in users.values() if u["username"] == username and u["password"] == password), None)
    if user:
        return jsonify({"success": True, "message": "Inicio de sesión exitoso"}), 200
    return jsonify({"success": False, "message": "Credenciales inválidas"}), 401

if __name__ == '__main__':
    app.run(debug=True)
