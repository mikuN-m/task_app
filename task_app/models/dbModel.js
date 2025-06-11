const Database = require('better-sqlite3');
const db = new Database('./db/database.sqlite');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    password TEXT
  )
`).run();


//allは複数行取得、配列としてreturn
//getは一件だけ取得、オブジェクトとしてreturn
//runはデータを変更するとき
module.exports = {
  getAllUsers: () => {
    return db.prepare('select * from users').all();
  }
}