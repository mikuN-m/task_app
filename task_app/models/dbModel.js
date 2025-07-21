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
    name TEXT NOT NULL,
    fatigue INTEGER NOT NULL CHECK(fatigue BETWEEN 1 AND 3),
    isFixed INTEGER NOT NULL DEFAULT 0 CHECK(isFixed IN (0, 1)),
    priority INTEGER NOT NULL CHECK(priority BETWEEN 1 AND 3),
    category TEXT NOT NULL,
    memo TEXT
  )
`).run();

// isFixed 0=可変 1=固定
// fatigue 疲労度
// priority 優先度

module.exports = db;


//allは複数行取得、配列としてreturn
//getは一件だけ取得、オブジェクトとしてreturn
//runはデータを変更するとき