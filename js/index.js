const m = document.querySelectorAll(".selectMenu");
const b = document.querySelector("#errorBanner")
const w = document.querySelector("#wacthedContainer")
const c = document.querySelector("#formContainer")
const f = document.querySelector("#favsContainer")


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
            f.style.display = 'none'

        // } else {

        //     w.style.display = 'none'
        //     f.style.display = 'none'

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
   
    const div = document.createElement("div")
    div.id = element.mal_id
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
    w.append(div)
    button.addEventListener('click', (e) => {
        button.textContent = '♥';      
        handleFaves(e.target)

    });
}


function handleFaves(obj) {

    
    const nobj = obj.parentNode.cloneNode(true)
    const button = document.createElement("button")
    
    button.id = 'delete'
    button.className = "remove-like"
    button.textContent =  "Remove from Favorites"
    f.append(nobj)
    button.addEventListener('click', (e) => {
        button.textContent = '♡'; 
        deleteFaves(e.target)

    });

}

function deleteFaves(obj) {

    
    console.log(obj)
    const nobj = obj.parentNode.cloneNode(true)
    console.log(nobj)

    // f.remove(nobj)


}