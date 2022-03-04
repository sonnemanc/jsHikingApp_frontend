

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

function fillHikeBox(i) {
  //this function will use .innerHTML to fill each element with the current selected Hike from addListener()
  document.querySelector('#name').innerText = hikes[i].attributes.name
  document.querySelector('#difficulty').innerText = 'Difficulty: ' + hikes[i].attributes.difficulty
  document.querySelector('#distance').innerText = 'Distance: ' + hikes[i].attributes.distance
  document.querySelector('#best_season').innerText = 'Best Season: ' + hikes[i].attributes.best_season
  document.querySelector('#trail_use').innerText = 'Trail Use: ' + hikes[i].attributes.trail_use
  document.querySelector('#notes').innerText = 'Notes: ' + hikes[i].attributes.notes
}

function addListener() {
  const dots = document.querySelectorAll('.dot');
  const dotsArr = Array.from(dots);
  for (let i = 0; i < dotsArr.length; i++) {
    const element = dotsArr[i]
    element.addEventListener( 'click', function() {
      fillHikeBox(i)
    } )
  }
}

//dot1.addEventListener('click', function() {}


window.addEventListener('DOMContentLoaded', () => {
  getHikes()
  addListener()
})

