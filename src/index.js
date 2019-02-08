const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// --------------------------------------------------------------

const toysContainer = document.querySelector('#toy-collection');
const toyFormEl = document.querySelector('.add-toy-form');

// render a single toy to page
function renderToy(toy) {
  const toyEl = document.createElement('div')
  toyEl.className = `card toy-${toy.id}`
  toyEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img class='toy-avatar' src=${toy.image}>
    <p>${toy.likes} Likes</p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>
  `
  const likeBtn = toyEl.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    toy.likes++
    toyEl.querySelector('p').innerText = `${toy.likes} Likes`;
    updateToy(toy);
  })
  toysContainer.appendChild(toyEl);
}

// render all toys onto page
function renderToys(toys) {
  toysContainer.innerHTML = "";
  toys.forEach(renderToy);
}

// event listener for creating a new toy
function addEventListenerToForm() {
  toyFormEl.addEventListener('submit', () => {
    const newToy = {
      "name": toyFormEl.name.value,
      "image": toyFormEl.image.value,
      "likes": 0
    }
    createToy(newToy)
      .then(renderToy);
  })
}

// --------------------- Server Stuff -------------------------

// get toys from server
function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}

// add toy to server
function createToy(toy) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
}

// update toy
function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
}

//--------------------- On page load ----------------------------

function initialization() {
  getToys()
    .then(renderToys);
  addEventListenerToForm();
}

initialization()
