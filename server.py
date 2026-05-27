from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import mimetypes

app = Flask(__name__)
CORS(app)

# 🔥🔥🔥 CONFIGURAÇÃO FORÇADA DE MIME TYPES 🔥🔥🔥
mimetypes.init()
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('image/jpg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('image/gif', '.gif')
mimetypes.add_type('audio/mpeg', '.mp3')
mimetypes.add_type('audio/ogg', '.ogg')

# Inicializa o banco
def init_db():
    conn = sqlite3.connect('jogos.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT UNIQUE,
        display_name TEXT,
        total_score INTEGER DEFAULT 0,
        current_stage INTEGER DEFAULT 1,
        completed_stages TEXT DEFAULT '[]',
        stage_stars TEXT DEFAULT '{}',
        avatar_config TEXT DEFAULT '{}'
    )''')
    conn.commit()
    conn.close()

init_db()

# ═══════════════════════════════════════════════════════════
# ROTAS PARA SERVIR ARQUIVOS ESTÁTICOS (COM MIME TYPE CORRETO)
# ═══════════════════════════════════════════════════════════

@app.route('/')
def index():
    return send_from_directory('.', 'index.html', mimetype='text/html')

@app.route('/style.css')
def serve_css():
    return send_from_directory('.', 'style.css', mimetype='text/css')

@app.route('/script.js')
def serve_js():
    return send_from_directory('.', 'script.js', mimetype='application/javascript')

@app.route('/gameData.js')
def serve_gamedata():
    return send_from_directory('.', 'gameData.js', mimetype='application/javascript')

@app.route('/practiceData.js')
def serve_practicedata():
    return send_from_directory('.', 'practiceData.js', mimetype='application/javascript')

@app.route('/simuladores/<path:filename>')
def serve_simuladores(filename):
    filepath = os.path.join('simuladores', filename)
    if os.path.exists(filepath):
        if filename.endswith('.js'):
            return send_from_directory('simuladores', filename, mimetype='application/javascript')
        return send_from_directory('simuladores', filename)
    return "Arquivo não encontrado", 404

@app.route('/img2/<path:filename>')
def serve_img2(filename):
    return send_from_directory('img2', filename)

@app.route('/sounds/<path:filename>')
def serve_sounds(filename):
    return send_from_directory('sounds', filename)

# ═══════════════════════════════════════════════════════════
# ROTAS DA API
# ═══════════════════════════════════════════════════════════

@app.route('/api/players', methods=['GET'])
def get_players():
    conn = sqlite3.connect('jogos.db')
    c = conn.cursor()
    c.execute('SELECT * FROM players ORDER BY total_score DESC LIMIT 50')
    players = []
    for row in c.fetchall():
        players.append({
            'id': row[0],
            'user_email': row[1],
            'display_name': row[2],
            'total_score': row[3],
            'current_stage': row[4],
            'completed_stages': eval(row[5]),
            'stage_stars': eval(row[6]),
            'avatar_config': eval(row[7])
        })
    conn.close()
    return jsonify(players)

@app.route('/api/players', methods=['POST'])
def create_player():
    data = request.json
    conn = sqlite3.connect('jogos.db')
    c = conn.cursor()
    try:
        c.execute('''INSERT INTO players 
            (user_email, display_name, total_score, current_stage, completed_stages, stage_stars, avatar_config) 
            VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (data['user_email'], data['display_name'], data.get('total_score', 0),
             data.get('current_stage', 1), str(data.get('completed_stages', [])),
             str(data.get('stage_stars', {})), str(data.get('avatar_config', {}))))
        conn.commit()
        data['id'] = c.lastrowid
    except:
        c.execute('SELECT * FROM players WHERE user_email = ?', (data['user_email'],))
        row = c.fetchone()
        data['id'] = row[0]
    conn.close()
    return jsonify(data)

@app.route('/api/players/<int:id>', methods=['PATCH'])
def update_player(id):
    data = request.json
    conn = sqlite3.connect('jogos.db')
    c = conn.cursor()
    updates = []
    values = []
    for key in ['total_score', 'current_stage', 'display_name']:
        if key in data:
            updates.append(f'{key} = ?')
            values.append(data[key])
    if 'completed_stages' in data:
        updates.append('completed_stages = ?')
        values.append(str(data['completed_stages']))
    if 'stage_stars' in data:
        updates.append('stage_stars = ?')
        values.append(str(data['stage_stars']))
    if 'avatar_config' in data:
        updates.append('avatar_config = ?')
        values.append(str(data['avatar_config']))
    
    if updates:
        values.append(id)
        c.execute(f'UPDATE players SET {", ".join(updates)} WHERE id = ?', values)
        conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/players/search')
def search_player():
    email = request.args.get('email')
    conn = sqlite3.connect('jogos.db')
    c = conn.cursor()
    c.execute('SELECT * FROM players WHERE user_email = ?', (email,))
    row = c.fetchone()
    conn.close()
    if row:
        return jsonify({
            'id': row[0], 'user_email': row[1], 'display_name': row[2],
            'total_score': row[3], 'current_stage': row[4],
            'completed_stages': eval(row[5]), 'stage_stars': eval(row[6]),
            'avatar_config': eval(row[7])
        })
    return jsonify(None)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
