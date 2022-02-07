const fs = require('fs/promises')
const path = require('path')

async function loadPosts(){
    let dataPost = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'post.json'), 'utf-8' )
    return dataPost ? JSON.parse(dataPost) : []
}

//ADD POSTS
const addPost = async (req, res)=>{
    console.log(req.files);
    const { title, description} = req.body
      if (!title || !description || (!req.files || Object.keys(req.files).length === 0)) {
        return {ok: false, data: null};
    }
    const {files} = req.files
    let extion = path.extname(files.name)
    let fileName = Date.now() + extion
    let filePath = path.join(process.cwd(), 'src', 'database', 'uploads', fileName)

    let posts = await loadPosts()
    await files.mv(filePath, async (err) => {
        if (err) {
            return {ok: false, data: null};
        }

        let newPost = {
            id: posts.length ? posts[posts.length-1].id+1 : 1,
            title,
            description,
            imgUrl: `/${fileName}`
        }
        posts.push(newPost)
        await fs.writeFile(path.join(process.cwd(), 'src', 'database', 'post.json'), JSON.stringify(posts, null, 4))

        return {ok: true, data: newPost};
    })
}

const indexView = async (req, res)=>{
    const {search} = req.query
    let posts = await loadPosts()
    let postArray = [];
    let searchQuery= [];
    if(search){
        searchQuery = search;
        for(const item of posts){
            if(item['title'].includes(search) || item['description'].includes(search)){
                postArray.push(item)
            }
        }
    }else{
        postArray = posts;
    }
    return res.render('pages/client/index', {layout: 'layout/client_layout', data:postArray, searchQuery})
}

const postIndexView = async (req, res)=>{
    let posts = await loadPosts()
    return res.render('pages/client/post', {layout: 'layout/client_layout', data:posts})
    }
    const postAddViewGet = async (req, res)=>{
    return res.render('pages/client/create', {ok:false, message: "", method: 'GET'})
    }
    const postAddViewPost = async (req, res)=>{ 
        
        const {ok} = addPost (req, res)
        if(ok){
            return res.redirect('/post')
        }
        return res.render('pages/client/create', {ok, method: 'POST'})
    }

module.exports = {
    postAddViewGet,
    postAddViewPost,
    postIndexView,
    indexView
}