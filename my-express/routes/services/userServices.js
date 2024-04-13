var userDao = require('../dao/userDAO')
var jwt =  require('jsonwebtoken')
async function saveUserService(data){
  const result =  await userDao.saveUserDAO(data)
  return result;
   
}

async function getUserService(){
  const result = await userDao.getUserDAO()
  result.forEach((obj)=>{
delete obj.pwd
  })

  
  return result
}


async function updateUserService(id,data){
  const result = await userDao.updateUserDAO(id,data)
   return result;
}

async function deleteUserService(id){
  const result =   await userDao.deleteUserDAO(id)
  return result;
}

async function authService(data){
   const result =  await  userDao.authDAO(data)
   if(result.length){
   const token =  jwt.sign(data,"my-token")
   result[0].token = token

   }
   console.log(1,result)
return result;
}

module.exports = {
    saveUserService,
    getUserService,
    updateUserService,
    deleteUserService,
    authService

}