const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToyForm = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToyForm = !addToyForm
  if (addToyForm) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// event listener on add new toy button
const submitBtn = document.querySelector('.submit')
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  const toyName = document.querySelector('.input-text').value
  const toyImage = document.querySelectorAll('.input-text')[1].value
  addToyToServer(toyName, toyImage)
    .then( toy => addToy(toy.id, toy.name, toy.image, toy.likes ));
  toyForm.reset();
})


// OR HERE!

const toysContainer = document.querySelector('#toy-collection')

// -----------------------------------------

// add a single toy to the page

const addToy = (id, name, image, likes) => {
  const toyEl = document.createElement('div')
  toyEl.className = `card toy-${id}`
  toyEl.innerHTML = `
  <h2>${name}</h2>
  <img class='toy-avatar' src=${image}>
  <p>${likes} Likes</p>
  <button class="like-btn" data-id=${id}>Like <3</button>
  `
  toysContainer.appendChild(toyEl)
}

// add multiple toys on the page

const addToys = toys => {
  for (const toy of toys){
    addToy(toy.id, toy.name, toy.image, toy.likes)
  }
}

// update toy likes
const updateToyCard = toy => {
  const toyLikeEl = document.querySelector(`#toy-collection .toy-${toy.id} p`)
  toyLikeEl.innerText = `${toy.likes} Likes`
}

// event listener on like button
document.addEventListener('click', event => {
  if(event.target.className === 'like-btn'){
    let toyId = event.target.dataset.id
    getToy(parseInt(toyId))
      .then( toy => updateToyLikes(toy.id, toy.name, toy.image, toy.likes))
      .then(updateToyCard);
  }
})


// remove all toy cards
const removeToys = () => {
    toysContainer.innerHTML = ""
}

// Server Stuff

// Will return an array of toy objects
const getToys = () => {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}


getToys().then(addToys)

// Add created toy to server and returns the created toy object
const addToyToServer = (name, image) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, image: image, likes: 0})
  })
  .then(resp => resp.json())
}

// return object of an individual toy
const getToy = id => {
  return fetch(`http://localhost:3000/toys/${id}`)
    .then(resp => resp.json())
}

// Return thr updated toy object
const updateToyLikes = (id, name, image, likes) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, image: image, likes: likes += 1})
  }).then(resp => resp.json())
}
