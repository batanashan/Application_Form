var express =  require('express') 
var verifyToken = require('../common/verifyToken')
var router = express.Router()  
var userService = require('../services/userServices')

router.post('/save-user',async (req,res,next)=>{
    const data = req.body.data
   const result = await userService.saveUserService(data)
    res.send(result)
})


router.get('/get-user',


async(req,res,next)=>{
const result = await userService.getUserService()
    res.send(result)
})

router.put('/update-user',verifyToken,async(req,res,next)=>{
const id = req.query.id
const data = req.body.data

const result = await userService.updateUserService(id,data)
    res.send(result)

})

router.delete('/delete-user/:id',verifyToken,async(req,res,next)=>{
    const id = req.params.id
   const result =await userService.deleteUserService(id)
    res.send(result)

})

router.post('/login',async(req,res,next)=>{
    const data = req.body.data
 const result = await userService.authService(data)
    res.send(result)

})





module.exports = router;