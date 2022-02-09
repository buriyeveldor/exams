const fs = require('fs/promises')
const path = require('path')


async function loadWords(){
    let word = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'dictionaryuser.json'), 'utf-8' )
    return word ? JSON.parse(word) : []
}

async function loadAdminWords(){
    let word = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'dictionary.json'), 'utf-8' )
    return word ? JSON.parse(word) : []
}
//ADD POSTS
const addWords = async (req, res)=>{
    console.log(req.files);
    const { title, description} = req.body
    if (!title || !description) {
        return {ok: false, data: null};
    }

    let words = await loadWords()
        let newWord = {
            id: words.length ? words[words.length-1].id+1 : 1,
            title,
            description,
            createdAt: Date.now(),
            updatedAt: null
        }
        words.push(newWord)
        await fs.writeFile(path.join(process.cwd(), 'src', 'database', 'dictionaryuser.json'), JSON.stringify(words, null, 4))

        return {ok: true, data: newWord};
    // })
}

//VIEW POSTS
const wordIndexView = async (req, res)=>{
    const {search} = req.query
    let words = await loadAdminWords()
    let wordArray = [];
    let searchQuery= [];
    if(search){
        searchQuery = search;
        for(const item of words){
            if(item['title'].includes(search) || item['description'].includes(search)){
                wordArray.push(item)

            }
        }
    }else{
        wordArray = [];
    }
    return res.render('pages/vdictionaryuser/index', {layout: 'layout/vdic_layout', data:wordArray, searchQuery})
}

const wordPostIndexView = async (req, res)=>{
    let searchQuery = ""
    const {id} = req.params
    if(id){
        let words = await loadWords()
        let word = words.find(el=>el['id']==id)
        return res.render('pages/vdictionaryuser/create', {layout: 'layout/vdic_layout', data:word ? word :{}, searchQuery})

    }
    return res.render('pages/vdictionaryuser/index', {layout: 'layout/vdic_layout', data:{}, searchQuery})
}

const wordAddViewGet = async (req, res)=>{
    const {ok} = addWords (req, res)
    if(ok){
        return res.redirect('/')
    }
    return res.render('pages/vdictionaryuser/create', {layout: 'layout/vdic_layout', ok:false, message: "", method: 'GET'})

}
const wordAddViewPost = async (req, res)=>{

    const {ok} = addWords (req, res)
    if(ok){
        return res.redirect('/')
    }
    return res.render('pages/vdictionaryuser/create', {layout: 'layout/vdic_layout', ok, method: 'POST'})
}

module.exports = {
    wordIndexView,
    wordAddViewGet,
    wordAddViewPost,
    wordPostIndexView
}