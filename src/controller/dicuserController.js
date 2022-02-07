const fs = require('fs/promises')
const path = require('path')


async function loadWords(){
    let word = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'dictionaryuser.json'), 'utf-8' )
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
    let words = await loadWords()
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
        wordArray = words;
    }
    return res.render('pages/dictionaryuser/index', {layout: 'layout/dic_layout', data:wordArray, searchQuery})
}

const wordView = async (req, res)=>{
    let searchQuery = ""
    const {id} = req.params
    if(id){
        let words = await loadWords()
        let word = words.find(el=>el['id']==id)
        return res.render('pages/dictionaryuser/create', {layout: 'layout/dic_layout', data:word ? word :{}, searchQuery})

    }
    return res.render('pages/dictionaryuser/index', {layout: 'layout/dic_layout', data:{}, searchQuery})
}

const wordPostIndexView = async (req, res)=>{
    // let words = await loadWords()
    // return res.render('pages/dictionary/index', {data:words})

    let searchQuery = ""
    const {id} = req.params
    if(id){
        let words = await loadWords()
        let word = words.find(el=>el['id']==id)
        return res.render('pages/dictionaryuser/create', {layout: 'layout/dic_layout', data:word ? word :{}, searchQuery})

    }
    return res.render('pages/dictionaryuser/index', {layout: 'layout/dic_layout', data:{}, searchQuery})
}

const wordAddViewGet = async (req, res)=>{
    return res.render('pages/dictionaryuser/create', {ok:false, message: "", method: 'GET'})
}
const wordAddViewPost = async (req, res)=>{

    const {ok} = addWords (req, res)
    if(ok){
        return res.redirect('/dictionaryuser')
    }
    return res.render('pages/dictionary/create', {ok, method: 'POST'})
}
//EDIT USERS
const editWordGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let words = await loadWords()
        let word = words.find(el => el['id'] == id)
        return res.render('pages/dictionaryuser/edit', {layout: 'layout/dic_layout',data:word})
    }
    return res.redirect('/dictionaryuser')
}
const editWordPOST =  async (req, res) => {
    console.log(req.body)
    const {title, description, id} = req.body
    if(title && description && id){
        let words = await loadWords()
        for (let index in words) {
            if(words[index]['id'] == id){
                words[index]['updatedAt'] = Date.now()
                words[index]['title'] = title
                words[index]['description'] = description
                break
            }
        }
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'dictionaryuser.json'), JSON.stringify(words, null, 4))
        return res.redirect('/dictionaryuser')
    }
    return res.redirect('/dictionaryuser')
}
//DELETE USERS
const deleteWordGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let words = await loadWords()
        let newWords = words.filter(el => el['id'] != id)
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'dictionaryuser.json'), JSON.stringify(newWords, null, 4))
        return res.redirect('/dictionaryuser')
    }
    return res.redirect('/dictionaryuser')
}

//ADD WORDS ADMIN PANEL
const addWordGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let userWords = await loadWords()
        let userWord = userWords.find(el => el['id'] == id)
        return res.render('pages/dictionaryuser/edit', {layout: 'layout/dic_layout', data:userWord})
    }
    return res.redirect('/dictionary')
}
const addWordPOST =  async (req, res) => {
    console.log(req.body)
    const {title, description, id} = req.body
    if(title && description && id){
        let userWords = await loadWords()
        for (let index in words) {
            if(userWords[index]['id'] == id){
                userWords[index]['createdAt'] = Date.now()
                userWords[index]['title'] = title
                userWords[index]['description'] = description
                break
            }
        }
        userWords.push(userWords)
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'dictionary.json'), JSON.stringify(userWords, null, 4))
        return res.redirect('/dictionary')
    }
    return res.redirect('/dictionary')
}
module.exports = {
    wordIndexView,
    wordView,
    wordAddViewGet,
    wordAddViewPost,
    wordPostIndexView,
    editWordPOST,
    editWordGET,
    deleteWordGET,
    addWordGET,
    addWordPOST
}