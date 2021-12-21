const API = 'https://swapi.dev/api/'
let people = []
let planets = []

const getPeople = async (apiPeople) => {
  try {
    const result = await fetch(API + apiPeople)
    // console.log(result);
    const people = await result.json()
    return people.results
  } catch (err) {
    console.log(err);
  }
}

function getPlanets (apiPlanets) {
  return new Promise((resolve, reject) => {
    fetch(API + apiPlanets)
    .then((results) => {
      results.json()
      .then((planets) => {
        // console.log(planets);
        resolve(planets.results)
      })
      .catch((err) => {
        reject(err)
      })
    })
  })
}

getPeople('people')
.then((peopleRes) => {
  people = peopleRes
  let people_root = document.getElementById('people-root')
  renderPeople(people, people_root)
  // peopleRes.push('hola')
  // console.log(people);
})

getPlanets('planets')
.then((planetsRes) => {
  planets = [...planetsRes]
  let population_root = document.getElementById('population-root')
  renderTotalPopulation(planets, population_root)
  // planetsRes.push('hola')
  // console.log(planets);
})

// HOISTING
function renderPeople (people, targetElement) {
  const html = people.map((person) => {
    return `
      <div>
        <h3>${person.name}</h3>
      </div>
    `
  }).join('')

  targetElement.innerHTML = html
}

function renderTotalPopulation(planets, targetElement) {
  const html = planets.reduce((prev, curr) => {
    // console.log(curr);
    const currNumber = Number(curr.population)
    if (isNaN(currNumber)){
      return prev
    }
    return prev + currNumber
  }, 0)
  targetElement.innerHTML = html
}