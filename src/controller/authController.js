const fs = require('fs/promises')
const path = require('path')
const generateToken = require('../lib/generate-token')
const path = require('path')



async function loadUser(){
    let data = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'user.json'), 'utf-8' )
    return data ? JSON.parse(data) : []
}

//ADD USERS
async function addUser(fullname, username, password){
    if(fullname && username && password){
        let users = await loadUser()
        let user = users.find(el=>el['username']==username)
        if(user){
            return {ok: false, message: 'Already username exists'}
        } 
            let newUser = {
                id: users.length ? users[users.length-1].id + 1 : 1,
                fullname,
                username,
                password
            }
            users.push(newUser)
            await fs.writeFile(path.join(process.cwd(), 'src', 'database', 'user.json'), JSON.stringify(users, null,4))
            return {ok: true, message: "user created"}
        } else{
            return {ok: false, message: 'Error'}
        
    }
}

//EDIT USERS
const editUserGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let users = await loadUser()
        let user = users.find(el => el['id'] == id)
        return res.render('pages/admin/auth/edit', {data:user})
    }
    return res.redirect('/admin/user')
}
const editUserPOST =  async (req, res) => {
    console.log(req.body)
    const {fullname, username, password, id} = req.body
    if(fullname && username && id){
        let users = await loadUser()
        for (let index in users) {      
            if(users[index]['id'] == id){
                users[index]['updatedAt'] = Date.now()
                users[index]['fullname'] = fullname
                users[index]['username'] = username
                users[index]['password'] = password
                break
            }
        }
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'user.json'), JSON.stringify(users, null, 4))
        return res.redirect('/admin/user')
    }
    return res.redirect('/admin/user')
}

//DELETE USERS
const deleteUserGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let users = await loadUser()
        let newUsers = users.filter(el => el['id'] != id)
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'user.json'), JSON.stringify(newUsers, null, 4))
        return res.redirect('/admin/user')
    }
    return res.redirect('/admin/user')
}

//AUTH LOGIN
const authLogin = (req,res)=>{
    return res.render('pages/admin/auth/login', {layout: 'layout/auth_layout', ok:false, method: 'GET'})
}
const authLoginPOST = async (req,res)=>{
    const {username, password} = req.body
    if(username && password){
        let users = await loadUser()
        let user = users.find(el=>el['username']==username && el['password']==password)
        if(user){
            let token = generateToken.mySign({id: user['id']})
            return res.cookie('token', token).redirect('/admin/user')
        } else{
        return res.render('pages/admin/auth/login', {layout: 'layout/auth_layout', ok:false, method: 'POST'})
        }
    } else {
        return res.render('pages/admin/auth/login', {layout: 'layout/auth_layout', ok:false, method: 'POST'})
        }
    }

//VIEW LOGIN
const userIndexView = async (req, res)=>{
    let users = await loadUser();
    return res.render('pages/admin/auth/index', {data:users})
    }
const userAddViewGet = async (req, res)=>{
    return res.render('pages/admin/auth/create', {ok:false, message: "", method: 'GET'})
    }
const userAddViewPost = async (req, res)=>{ 
        const {fullname, username, password} = req.body
        const {ok, message} = await addUser (fullname, username, password)
        if(ok){
            return res.redirect('/admin/user')
        }
    return res.render('pages/admin/auth/create', {ok, message: message, method: 'POST'})
    }

    
    const logout = (req, res)=>{
    return res.cookie('token', '').redirect('/auth/login')
    }
    

module.exports = {

    userIndexView,
    userAddViewGet,
    userAddViewPost,
    editUserGET,
    editUserPOST,
    authLogin,
    authLoginPOST,
    deleteUserGET,
    logout
}