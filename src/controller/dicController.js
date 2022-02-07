const fs = require('fs/promises')
const path = require('path')


async function loadWords(){
    let word = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'dictionary.json'), 'utf-8' )
    return word ? JSON.parse(word) : []
}
async function loadUserWords(){
    let word = await fs.readFile(path.join(process.cwd(), 'src', 'database', 'dictionaryuser.json'), 'utf-8' )
    return word ? JSON.parse(word) : []
}

//ADD WORDS
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
        await fs.writeFile(path.join(process.cwd(), 'src', 'database', 'dictionary.json'), JSON.stringify(words, null, 4))

        return {ok: true, data: newWord};
    // })
}

//VIEW WORDS
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
    return res.render('pages/dictionary/index', {layout: 'layout/dic_layout', data:wordArray, searchQuery})
}

// const wordUserIndexView = async (req, res)=>{
//     const {search} = req.query
//     let words = await loadUserWords()
//     let wordArray = [];
//     let searchQuery= [];
//     if(search){
//         searchQuery = search;
//         for(const item of words){
//             if(item['title'].includes(search) || item['description'].includes(search)){
//                 wordArray.push(item)
//
//             }
//         }
//     }else{
//         wordArray = words;
//     }
//     return res.render('pages/dictionary/index', {layout: 'layout/dic_layout', dataUser:wordArray, searchQuery})
// }


const wordAddViewGet = async (req, res)=>{
    return res.render('pages/dictionary/create', {ok:false, message: "", method: 'GET'})
}
const wordAddViewPost = async (req, res)=>{

    const {ok} = addWords (req, res)
    if(ok){
        return res.redirect('/dictionary')
    }
    return res.render('pages/dictionary/create', {ok, method: 'POST'})
}
//EDIT USERS
const editWordGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let words = await loadWords()
        let word = words.find(el => el['id'] == id)
        return res.render('pages/dictionary/edit', {layout: 'layout/dic_layout', data:word})
    }
    return res.redirect('/dictionary')
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
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'dictionary.json'), JSON.stringify(words, null, 4))
        return res.redirect('/dictionary')
    }
    return res.redirect('/dictionary')
}
//DELETE USERS
const deleteWordGET = async (req, res) => {
    let id = req.params.id
    if(id){
        let words = await loadWords()
        let newWords = words.filter(el => el['id'] != id)
        await fs.writeFile(path.join(process.cwd(), 'src','database', 'dictionary.json'), JSON.stringify(newWords, null, 4))
        return res.redirect('/dictionary')
    }
    return res.redirect('/dictionary')
}



module.exports = {
    wordIndexView,
    // wordUserIndexView,
    wordAddViewGet,
    wordAddViewPost,
    editWordPOST,
    editWordGET,
    deleteWordGET,
}