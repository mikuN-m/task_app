const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// dbフォルダとファイルのパス
const dbPath = path.join(__dirname, '../db/database.sqlite');

// フォルダがない場合は作成
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// DBを生成・接続
const db = new Database(dbPath);

// 初期テーブル作成（なければ）
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    fatigueLevel INTEGER NOT NULL,
    taskName TEXT NOT NULL,
    category TEXT NOT NULL,
    dueDate TEXT NOT NULL,
    dueTime TEXT,
    memo TEXT
  )
`).run();

module.exports = db;


//allは複数行取得、配列としてreturn
//getは一件だけ取得、オブジェクトとしてreturn
//runはデータを変更するとき