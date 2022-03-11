const hikeUrl = "http://localhost:3000/api/v1/hikes"

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is Loaded');
  getHikes()
  addMapButtons()

  const createCommentForm = document.querySelector('.add-comment-form')
  createCommentForm.addEventListener('submit', (e) => createFormHandler(e) )

  //const deleteBtn = document.querySelector('')

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
  hikes = []
  fetch(hikeUrl)
  .then(response => response.json())
  .then(hike => {
    hike.data.forEach(hike => {
      let newHike = new Hike(hike, hike.attributes)
    })
  })
}

function currentHikeId() {
  return document.querySelector('#name').innerText[0]
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

function addComment(comment) {
  let li = document.createElement('li');
  li.setAttribute('id', 'comment');
  document.querySelector('#commentList').appendChild(li);
  li.innerText = comment.user_name + ' said: ' + comment.content
}

function fillCommentBox() {
  let currentHike = hikes.find(displayedHike)                                //this is to keep track of the current hike in case I need to call that when creating a new comment later
  document.querySelector('.add-comment-form').style.display = 'inline'       //this unhides the comment form
  if (currentHike.comments.length === 0) {
    document.querySelector('#commentList').innerText = `There aren't any comments for this hike yet!`      //if no comments display a message
  } else {
      document.querySelector('#commentList').innerText = ``                     //this clears the list between clicks!
      currentHike.comments.forEach(comment => {                                 //iterate through each comment, appending a new li element to the created ul element
        addComment(comment)
      })
    }
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

function createFormHandler(e) {
  e.preventDefault()
  const user_name = document.querySelector('.input-text').value
  const content = document.querySelector('#input-description').value
  const hike_id = currentHikeId()
  patchFetch(user_name, content, hike_id )
  document.querySelector('.add-comment-form').reset()
}

function patchFetch(user_name, content, hike_id) {
  const bodyData = {user_name, content, hike_id}
  let patchUrl = hikeUrl + '/' + currentHikeId()

  fetch(patchUrl, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json() )
  .then(hike => {
    hikes[currentHikeId() - 1].comments = []    //this empties the comments array for the specific hike, so that we can update it below
    document.querySelector('#commentList').innerText = ``
    hike.data.attributes.comments.forEach(comment => {
      addComment(comment)
        hikes[currentHikeId() - 1].comments.push(comment)    //this refills the emptied comments array for the highlighted hike object
  })
})
}

function deleteComment() {}