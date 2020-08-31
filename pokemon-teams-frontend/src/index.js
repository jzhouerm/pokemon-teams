document.addEventListener("DOMContentLoaded", (e) => {

    //Global variables
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers/`
    const POKEMONS_URL = `${BASE_URL}/pokemons/`
    const trainersH2 = document.querySelector("main")
   
    //functions
    function fetchTrainers(){
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => renderTrainers(trainers))
    }

    const renderTrainers = (trainers) => {
        trainers.forEach(trainer => {
            const trainerDiv = renderTrainer(trainer)
            const ul = document.createElement('ul')
            trainerDiv.append(ul)

            trainer.pokemons.forEach(pokemon => {
                renderPokemon(pokemon, ul)
            })
        })
    }

    const renderTrainer = (trainer) => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `<p>${trainer.name}</p><button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>`
        trainersH2.append(card)
        return card
    }
    // const pokemons = ``
    const renderPokemon = (pokemon, ul) => {
        let pokemonLi = document.createElement("li")
        pokemonLi.innerHTML = `${pokemon.nickname}, (${pokemon.species}) <button class="release" data-id="${pokemon.id}">Release</button>`

        ul.append(pokemonLi)
    }

    //event listeners
    document.addEventListener("click", e => {
    if (e.target.matches(".release")){
        pokeId = e.target.dataset.id

        const configObj = {
           method: "DELETE"
           } 
        
        fetch(POKEMONS_URL + pokeId, configObj)
        .then(response => response.json())
        .then(pokemon => {
            let x = document.querySelector(`[data-id="${pokemon.id}"]`)
            x.parentElement.remove()
        })
    //traverse 
    } else if (e.target.matches('.add')) {
        let newPokeLi = document.createElement("li")
        let pokeUl = e.target.nextElementSibling
        let trainerId = e.target.dataset.trainerId
        pokeUl.append(newPokeLi)
        
        const options = {
           method: "POST",
           headers: {
             "content-type": "application/json",
             "accept": "application/json"
           },
           body: JSON.stringify({trainer_id: trainerId})
        } 
        fetch(POKEMONS_URL, options)
        .then(response => response.json())
        .then(pokemon => renderPokemon(pokemon, pokeUl))
    }


    })

    // invoke functions
    fetchTrainers()
})


/*
 1) When user loads page they see all trainers w list of pokemon
    - DOMContentLoaded listener
    - GET to /trainers
    - render trainers
    - render pokemons

2) Whenever a user hits Add Pokemon and they have space on their team, 
they should get a new Pokemon.

3) Whenever a user hits Release Pokemon on a specific Pokemon team, 
that specific Pokemon should be released from the team */
