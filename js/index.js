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

    console.log(obj)

}