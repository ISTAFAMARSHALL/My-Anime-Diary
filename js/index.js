const m = document.querySelectorAll(".select");
const b = document.querySelector("#messageBanner")
const w = document.querySelector("#wList")
const c = document.querySelector("#create")
const f = document.querySelector("#favs")


document.addEventListener("DOMContentLoaded",handleload)

for (const item of m) {


    w.style.display = 'none'

    item.addEventListener('click', e => {

        if (e.target == document.querySelector("#watched.select")) {

            w.style.display = ''
            c.style.display = 'none'
            f.style.display = 'none'
            console.log(item)
            console.log(e.target)

        } else if (e.target == document.querySelector("#favsList.select")) {

            w.style.display = 'none'
            c.style.display = 'none'
            console.log(item)
            console.log(e.target)

        } else if (e.target == document.querySelector("#input.select")) {

            c.style.display = ''
            w.style.display = 'none'
            f.style.display = 'none'

        } else {

            w.style.display = 'none'
            f.style.display = 'none'

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
    div.id = `Anime # ${element.id}`
    div.className = 'anime-list'

    const img = document.createElement('img')
    img.src = element.image_url

    const  title = document.createElement("h2")
    title.textContent = element.title

    const ul = document.createElement("ul")
    ul.className = "details"
    ul.innerText = `
    Episodes: ${element.episodes}
    Airing: ${element.airing}
    Synopsis: 
    ${element.synopsis}`

    const button = document.createElement("button")
    button.id = `Anime # ${element.id} - like`
    button.className = "anime-likes"
    button.textContent =  "♡"

    div.append(img,title,ul,button)
    w.append(div)
}

