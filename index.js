

// Url for fetch function
let hikeUrl = "http://localhost:3000/api/v1/hikes"

//array to keep hikes once fetched
let hikes = []
//
function getHikes() {
  fetch(hikeUrl)
  .then(response => response.json())
  .then(hike => {
    hike.data.forEach(hike => {
      hikes.push(hike)
    })
  })
}

function fillHikeBox() {
  //this function will use .innerHTML to fill each element with the current selected Hike from addListener()
}

function addListener() {
  const dots = document.querySelectorAll('.dot');
  const dotsArr = Array.from(dots);
  for (let i = 0; i < dotsArr.length; i++) {
    const element = dotsArr[i]
    element.addEventListener('click', function() {
      console.log(hikes[i].attributes.name)
    })
  }
}

//dot1.addEventListener('click', function() {}


window.addEventListener('DOMContentLoaded', () => {
  getHikes()
  addListener()
})

