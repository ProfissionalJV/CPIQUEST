from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import mimetypes
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app)

# 🔥 CONFIGURAÇÃO DO BANCO POSTGRESQL
DATABASE_URL = os.environ.get('DATABASE_URL')

if not DATABASE_URL:
    # Fallback para desenvolvimento local (SQLite)
    import sqlite3
    USE_SQLITE = True
    print("⚠️ Usando SQLite (modo desenvolvimento local)")
else:
    USE_SQLITE = False
    print(f"✅ Conectando ao PostgreSQL: {DATABASE_URL[:50]}...")

# Configurar MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('image/jpg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('image/gif', '.gif')
mimetypes.add_type('audio/mpeg', '.mp3')

# ═══════════════════════════════════════════════════════════
# FUNÇÕES DO BANCO DE DADOS
# ═══════════════════════════════════════════════════════════

def get_db_connection():
    if USE_SQLITE:
        conn = sqlite3.connect('jogos.db')
        conn.row_factory = sqlite3.Row
        return conn
    else:
        return psycopg2.connect(DATABASE_URL)

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    
    if USE_SQLITE:
        cur.execute('''
            CREATE TABLE IF NOT EXISTS players (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_email TEXT UNIQUE,
                display_name TEXT,
                total_score INTEGER DEFAULT 0,
                current_stage INTEGER DEFAULT 1,
                completed_stages TEXT DEFAULT '[]',
                stage_stars TEXT DEFAULT '{}',
                avatar_config TEXT DEFAULT '{}'
            )
        ''')
    else:
        cur.execute('''
            CREATE TABLE IF NOT EXISTS players (
                id SERIAL PRIMARY KEY,
                user_email TEXT UNIQUE,
                display_name TEXT,
                total_score INTEGER DEFAULT 0,
                current_stage INTEGER DEFAULT 1,
                completed_stages TEXT DEFAULT '[]',
                stage_stars TEXT DEFAULT '{}',
                avatar_config TEXT DEFAULT '{}'
            )
        ''')
    
    conn.commit()
    cur.close()
    conn.close()
    print("✅ Banco de dados inicializado")

# Inicializa o banco
init_db()

# ═══════════════════════════════════════════════════════════
# ROTAS PARA SERVIR OS ARQUIVOS ESTÁTICOS
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
    return send_from_directory('simuladores', filename, mimetype='application/javascript')

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
    conn = get_db_connection()
    
    if USE_SQLITE:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute('SELECT * FROM players ORDER BY total_score DESC LIMIT 50')
        rows = cur.fetchall()
        players = []
        for row in rows:
            players.append({
                'id': row['id'],
                'user_email': row['user_email'],
                'display_name': row['display_name'],
                'total_score': row['total_score'],
                'current_stage': row['current_stage'],
                'completed_stages': eval(row['completed_stages']),
                'stage_stars': eval(row['stage_stars']),
                'avatar_config': eval(row['avatar_config'])
            })
    else:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute('SELECT * FROM players ORDER BY total_score DESC LIMIT 50')
        rows = cur.fetchall()
        players = []
        for row in rows:
            players.append({
                'id': row['id'],
                'user_email': row['user_email'],
                'display_name': row['display_name'],
                'total_score': row['total_score'],
                'current_stage': row['current_stage'],
                'completed_stages': eval(row['completed_stages']),
                'stage_stars': eval(row['stage_stars']),
                'avatar_config': eval(row['avatar_config'])
            })
    
    cur.close()
    conn.close()
    return jsonify(players)

@app.route('/api/players', methods=['POST'])
def create_player():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if USE_SQLITE:
            cur.execute('''
                INSERT INTO players (user_email, display_name, total_score, current_stage, completed_stages, stage_stars, avatar_config) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (data['user_email'], data['display_name'], data.get('total_score', 0),
                  data.get('current_stage', 1), str(data.get('completed_stages', [])),
                  str(data.get('stage_stars', {})), str(data.get('avatar_config', {}))))
            conn.commit()
            data['id'] = cur.lastrowid
        else:
            cur.execute('''
                INSERT INTO players (user_email, display_name, total_score, current_stage, completed_stages, stage_stars, avatar_config) 
                VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id
            ''', (data['user_email'], data['display_name'], data.get('total_score', 0),
                  data.get('current_stage', 1), str(data.get('completed_stages', [])),
                  str(data.get('stage_stars', {})), str(data.get('avatar_config', {}))))
            conn.commit()
            data['id'] = cur.fetchone()[0]
    except Exception as e:
        conn.rollback()
        if USE_SQLITE:
            cur.execute('SELECT id FROM players WHERE user_email = ?', (data['user_email'],))
        else:
            cur.execute('SELECT id FROM players WHERE user_email = %s', (data['user_email'],))
        row = cur.fetchone()
        data['id'] = row[0] if row else None
    
    cur.close()
    conn.close()
    return jsonify(data)

@app.route('/api/players/<int:id>', methods=['PATCH'])
def update_player(id):
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    
    updates = []
    values = []
    
    for key in ['total_score', 'current_stage', 'display_name']:
        if key in data:
            updates.append(f'{key} = ?' if USE_SQLITE else f'{key} = %s')
            values.append(data[key])
    
    if 'completed_stages' in data:
        updates.append('completed_stages = ?' if USE_SQLITE else 'completed_stages = %s')
        values.append(str(data['completed_stages']))
    
    if 'stage_stars' in data:
        updates.append('stage_stars = ?' if USE_SQLITE else 'stage_stars = %s')
        values.append(str(data['stage_stars']))
    
    if 'avatar_config' in data:
        updates.append('avatar_config = ?' if USE_SQLITE else 'avatar_config = %s')
        values.append(str(data['avatar_config']))
    
    if updates:
        values.append(id)
        query = f'UPDATE players SET {", ".join(updates)} WHERE id = ?' if USE_SQLITE else f'UPDATE players SET {", ".join(updates)} WHERE id = %s'
        cur.execute(query, values)
        conn.commit()
    
    cur.close()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/players/search')
def search_player():
    email = request.args.get('email')
    conn = get_db_connection()
    
    if USE_SQLITE:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute('SELECT * FROM players WHERE user_email = ?', (email,))
        row = cur.fetchone()
        if row:
            result = {
                'id': row['id'],
                'user_email': row['user_email'],
                'display_name': row['display_name'],
                'total_score': row['total_score'],
                'current_stage': row['current_stage'],
                'completed_stages': eval(row['completed_stages']),
                'stage_stars': eval(row['stage_stars']),
                'avatar_config': eval(row['avatar_config'])
            }
        else:
            result = None
    else:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute('SELECT * FROM players WHERE user_email = %s', (email,))
        row = cur.fetchone()
        if row:
            result = {
                'id': row['id'],
                'user_email': row['user_email'],
                'display_name': row['display_name'],
                'total_score': row['total_score'],
                'current_stage': row['current_stage'],
                'completed_stages': eval(row['completed_stages']),
                'stage_stars': eval(row['stage_stars']),
                'avatar_config': eval(row['avatar_config'])
            }
        else:
            result = None
    
    cur.close()
    conn.close()
    return jsonify(result)

# ═══════════════════════════════════════════════════════════
# ROTA DE DEBUG (para listar arquivos)
# ═══════════════════════════════════════════════════════════

@app.route('/debug/files')
def list_files():
    import os
    files = []
    for root, dirs, filenames in os.walk('.'):
        for filename in filenames:
            files.append(os.path.join(root, filename))
    return jsonify(files[:100])  # Limita a 100 arquivos

# ═══════════════════════════════════════════════════════════
# INICIALIZAÇÃO
# ═══════════════════════════════════════════════════════════

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
