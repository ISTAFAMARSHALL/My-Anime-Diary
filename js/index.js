const m = document.querySelectorAll(".selectMenu");
const b = document.querySelector("#errorBanner")
const w = document.querySelector("#wacthedContainer")
const c = document.querySelector("#formContainer")
const f = document.querySelector("#favsContainer")
const form = document.querySelector("#formContainer")


document.addEventListener("DOMContentLoaded",handleload)


for (const item of m) {


    w.style.display = 'none'
    f.style.display = 'none'

    item.addEventListener('click', e => {

        if (e.target == document.querySelector("#watched.selectMenu")) {

            w.style.display = ''
            c.style.display = 'none'
            f.style.display = 'none'

        } else if (e.target == document.querySelector("#favsList.selectMenu")) {

            w.style.display = 'none'
            c.style.display = 'none'
            f.style.display = ''

        } else if (e.target == document.querySelector("#input.selectMenu")) {

            c.style.display = ''
            w.style.display = 'none'
            f.style.display = 'none';

        }
        
    }) 

};


function handleload() {

    fetchlist()

}


function fetchlist() {
    
    fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
    .then(resp => resp.json())
    .then(list => handleList(list))
    .catch(() => errorDisplay())

}

form.addEventListener("submit", addEntry)

function addEntry(obj) {

    obj.preventDefault()

    const image = obj.srcElement[0]
    const t = obj.srcElement[1]
    const e = obj.srcElement[2]
    const a = obj.srcElement[3]
    const s = obj.srcElement[4]

        
    const newElement = {

        mal_id: 0 ,
        image_url: image.value,
        title: t.value,
        episodes: e.value,
        airing: a.value,
        synopsis: s.value,
    }

    return makeTile(newElement)

}

function handleList(obj) {

    l = obj.results

    l.forEach(element => {
        
        makeTile(element)
        
    });

}

function errorDisplay() {

    b.innerText = 'load error'

}

function makeTile(element) {
    
    const container = document.createElement("div")
    const div = document.createElement("div")
    container.id = element.mal_id
    div.className = 'anime-list'

    const img = document.createElement('img')
    img.src = element.image_url

    const  title = document.createElement("h2")
    title.textContent = element.title

    const ul = document.createElement("ul")
    ul.className = "details"
    ul.innerText = `Episodes: ${element.episodes}

    Airing: ${element.airing}
    
    Synopsis: 
    ${element.synopsis}`

    const button = document.createElement("button")
    
    button.id = 'heart'
    button.className = "anime-likes"
    button.textContent =  "♡"
    div.append(img,title,ul,button)
    container.append(div)
    w.append(container)


    button.addEventListener('click', (e) => {
        button.textContent = '♥';
        console.log(button)
        console.log(e.target)
        button.disabled = true;      
        handleFaves(e.target)

    });
}


function handleFaves(obj) {

    const container = document.createElement("div")
    const nobj = obj.parentElement.cloneNode(true);
    const btn = document.createElement("button")
    
    btn.id = 'favRemove'
    btn.textContent =  "Remove from Favorites"

    container.append(nobj,btn);
    f.append(container);

    btn.addEventListener('click', (e) => {
        obj.textContent = '♡';
        obj.disabled = false;   
        deleteFaves(e.target)

    });

};


function deleteFaves(obj) {

    obj.parentNode.remove()    

}