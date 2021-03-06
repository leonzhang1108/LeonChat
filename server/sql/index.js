import { query } from './async-db'

const initTable = async () => {
  let sql = `
    CREATE TABLE IF NOT EXISTS chat_history (
      ID int NOT NULL AUTO_INCREMENT, 
      NAME VARCHAR(255), 
      CONTENT VARCHAR(255),
      CREATEDATE datetime NOT NULL DEFAULT NOW(),
      PRIMARY KEY (ID)
    );`
  await query(sql)
}

const addHistory = async ({ user, content }) => {
  let sql = `INSERT INTO chat_history (NAME, CONTENT) values (?, ?);`
  await query(sql, [user.name, content])
}

// 向上获取5条
const getHistory = async page => {
  const pageSize = 10
  let limit = pageSize
  if (page) {
    if (page > pageSize) {
      page -= pageSize
    } else {
      limit = page
      page = 0
    }
  } else {
    const res = await query(`SELECT MAX(id) as page FROM chat_history;`)
    page = res[0].page - pageSize
    if (page < 0) page = 0
  }

  let sql = `SELECT name, content FROM chat_history WHERE id > ${page} LIMIT ${limit};`

  const list = await query(sql)

  return { page, list }
}

module.exports = {
  initTable,
  addHistory,
  getHistory
}
