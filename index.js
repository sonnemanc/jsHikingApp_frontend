const hikeUrl = "http://localhost:3000/api/v1/hikes"

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is Loaded');
  getHikes()
  addMapButtons()
  const createCommentForm = document.querySelector('.add-comment-form')
  createCommentForm.addEventListener('submit', (e) => createFormHandler(e) )
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
}

function displayedHike(hike) {
  return hike.id === currentHikeId() 
}

function fillCommentBox() {
  let currentHike = hikes.find(displayedHike)
        //this unhides the comment form
  document.querySelector('.add-comment-form').style.display = 'inline'
        //this is to keep track of the current hike in case I need to call that when creating a new comment later
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'commentList');
        //if no comments display a message
  if (currentHike.comments.length === 0) {
    document.querySelector('.hikeComments').innerText = `There aren't any comments for this hike yet!`
  } else {
        //this is here to clear the empty container message.
    document.querySelector('.hikeComments').innerText = ``
        //if there are comments this puts them in a list
    document.querySelector('.hikeComments').appendChild(ul);
        //iterate through each comment, appending a new li element to the created ul element
    currentHike.comments.forEach(comment => {
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
      fillCommentBox()
    } )
  }
}

function currentHikeId() {
  return document.querySelector('#name').innerText[0]
}

function createFormHandler(e) {
  e.preventDefault()
  const user_name = document.querySelector('.input-text').value
  const content = document.querySelector('#input-description').value
  const hike_id = currentHikeId()
  patchFetch(user_name, content, hike_id )
}

function patchFetch(user_name, content, hike_id) {
  const bodyData = {user_name, content, hike_id}
  let patchUrl = hikeUrl + '/' + currentHikeId()

  fetch(patchUrl, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData)
  })
  .then(response => console.log(response) )
  .then(comment => {
    console.log(comment)
    
  })

}


//window.addEventListener('DOMContentLoaded', () => {
//  getHikes()
//  addListener()
//
//  const createCommentForm = document.querySelector('.add-comment-form')
//  createCommentForm.addEventListener('submit', (e) => createFormHandler(e) )
//})