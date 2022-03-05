const hikeUrl = "http://localhost:3000/api/v1/hikes"

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is Loaded');
  getHikes()
  addMapButtons()
})

class Hike {
  constructor(hike, hikeAttributes) {
    this.id = hike.id
    this.name= hikeAttributes.name
    this.difficulty = hikeAttributes.difficulty
    this.best_season = hikeAttributes.best_season
    this.distance = hikeAttributes.distance
    this.notes = hikeAttributes.notes
    this.trail_use = hikeAttributes.trail_use
    this.comments = hikeAttributes.comments
    hikes.push(this)
  }
}

let hikes = []

function getHikes() {
  fetch(hikeUrl)
  .then(response => response.json())
  .then(hike => {
    hike.data.forEach(hike => {
      let newHike = new Hike(hike, hike.attributes)
      //console.log(hike.attributes.comments)
    })
  })
}

function fillHikeBox(i) {
  //this function will use .innerHTML to fill each element with the current selected Hike from addListener()
  document.querySelector('#name').innerText = hikes[i].id + '. ' + hikes[i].name
  document.querySelector('#difficulty').innerText = 'Difficulty: ' + hikes[i].difficulty
  document.querySelector('#distance').innerText = 'Distance: ' + hikes[i].distance
  document.querySelector('#best_season').innerText = 'Best Season: ' + hikes[i].best_season
  document.querySelector('#trail_use').innerText = 'Trail Use: ' + hikes[i].trail_use
  document.querySelector('#notes').innerText = 'Notes: ' + hikes[i].notes
  console.log(hikes[i])
}



function fillCommentBox(i) {
  //this unhides the comment form
  document.querySelector('.add-comment-form').style.display = 'inline'
  //this is to keep track of the current hike in case I need to call that when creating a new comment later
  let currentHike = hikes[i]

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'commentList');

  
 
  
  //if no comments display a message
  if (hikes[i].comments.length === 0) {
    document.querySelector('.hikeComments').innerText = `There aren't any comments for this hike yet!`

  
  } else {
  //if there are comments I want them to be in a list
    document.querySelector('.hikeComments').appendChild(ul);

  //iterate through each comment, appending a new li element to the ul
    hikes[i].comments.forEach(comment => {

      let li = document.createElement('li');
      li.setAttribute('id', 'comment')

      document.querySelector('#commentList').appendChild(li);
      li.innerText = comment.user_name + ' said: ' + comment.content
  })}
}


function addMapButtons() {
  const dots = document.querySelectorAll('.dot');
  const dotsArr = Array.from(dots);
  for (let i = 0; i < dotsArr.length; i++) {
    const element = dotsArr[i]
    element.addEventListener( 'click', function() {
      fillHikeBox(i)
      fillCommentBox(i)
    } )
  }
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('.input-text').value
  const contentInput = document.querySelector('#input-description').value
  postFetch(nameInput, contentInput)
}

function postFetch(nameInput, contentInput) {
  console.log(nameInput, contentInput)
}


//window.addEventListener('DOMContentLoaded', () => {
//  getHikes()
//  addListener()
//
//  const createCommentForm = document.querySelector('.add-comment-form')
//  createCommentForm.addEventListener('submit', (e) => createFormHandler(e) )
//})