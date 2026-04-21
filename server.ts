import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('exam_management.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseName TEXT NOT NULL,
    examDate TEXT NOT NULL,
    session TEXT NOT NULL CHECK (session IN ('Morning', 'Evening')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert sample data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM exams').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO exams (courseName, examDate, session) VALUES (?, ?, ?)');
  insert.run('Data Structures', '2026-05-20', 'Morning');
  insert.run('Database Systems', '2026-04-15', 'Evening');
  insert.run('Web Development', '2026-06-12', 'Morning');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/exams', (req, res) => {
    const searchTerm = req.query.search ? `%${req.query.search}%` : '%';
    const exams = db.prepare('SELECT * FROM exams WHERE courseName LIKE ? ORDER BY examDate ASC').all(searchTerm);
    res.json(exams);
  });

  app.post('/api/exams', (req, res) => {
    const { courseName, examDate, session } = req.body;
    const info = db.prepare('INSERT INTO exams (courseName, examDate, session) VALUES (?, ?, ?)').run(courseName, examDate, session);
    res.json({ id: info.lastInsertRowid });
  });

  app.put('/api/exams/:id', (req, res) => {
    const { courseName, examDate, session } = req.body;
    db.prepare('UPDATE exams SET courseName = ?, examDate = ?, session = ? WHERE id = ?').run(courseName, examDate, session, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/exams/:id', (req, res) => {
    db.prepare('DELETE FROM exams WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
