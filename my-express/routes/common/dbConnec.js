const mongoDB = require('mongodb')

async function getDbConnect(){
const url = "mongodb+srv://u1:p1@students.ytu6bx8.mongodb.net/"
const mongoClient = mongoDB.MongoClient
   const server = await mongoClient.connect(url)
  const db =  server.db("7amdb")
  return db;
}

module.exports = getDbConnect;