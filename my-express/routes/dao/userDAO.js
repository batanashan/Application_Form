
const { ObjectId } = require('mongodb');
var getDbConnect = require('../common/dbConnec')

async function saveUserDAO(data){
    try{
        const db = await getDbConnect()

  const collection = db.collection("users")
 const result =    await  collection.insertOne(data)
 return result;
    }
    catch(ex){
     console.error("saveUserDao",ex)
    }
  
}

async function getUserDAO(){
try{
    const db = await getDbConnect()
const collection = db.collection('users')   
        const result =   await  collection.find({}).toArray()
        return result;
}catch(ex){
console.log("getUserDao", ex)
}
}

async function updateUserDAO(id,data){
    const db =await getDbConnect()
   const collection =  db.collection("users")
  const result =  await collection.updateOne({_id:new ObjectId(id)},{$set:data})
  return result;
}
 
async function deleteUserDAO(id){
    const db =await getDbConnect()
    const collection =  db.collection("users")
 const result =  collection.deleteOne({_id:new ObjectId(id)})
 return result;
}

async function authDAO(data){

const db = await getDbConnect()
const collection = db.collection("users")
const result = await collection.find(data).toArray()

return result;
}

module.exports = {
    saveUserDAO,
    getUserDAO,
    updateUserDAO,
    deleteUserDAO,
    authDAO

}