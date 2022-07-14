const m = document.querySelectorAll(".select");
const w = document.querySelector("#watchedlist")
console.log(m)
console.log(w)

document.addEventListener("DOMContentLoaded",handleload)

function handleload() {

    fetchlist()

}

function fetchlist() {
    
    fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
    .then(resp => resp.json())
    .then(list => handelDisplayList(list))
    .catch()

}



function handelDisplayList(obj) {


    l = obj.results
    l.forEach(element => {
        
        console.log(element.image_url)
        console.log(element.title)
        console.log(element.episodes)
        
        console.log(element.airing)
        console.log(element.synopsis)
        
    });

}

function maketile(element) {

    const div = document.createElement("div")
    div.id = `Anime # ${list.id}`
    div.className = 'anime-list'

    const bg = document.createElement('img')
    bg = element.image_url

    const  title = document.createElement("h2")
    title.textContent = element.title

    const span = document.createElement("span")
    span.className = "details"
    span.textContent = `
    Episodes: ${element.episodes}
    Airing: ${element.airing}
    Synopsis: ${element.synopsis} `

    const button = document.createElement("button")
    button.id = `Anime # ${list.id} - like`
    button.className = "anime-likes"
    button.textContent =  "❤"

    div.append(bg,title,span,button)
    animeUl().appendchild("div")
}