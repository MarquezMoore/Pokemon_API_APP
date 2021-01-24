// JavaScript Document

let pokemonRepository = (function() {
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/?limit=1118`;
    let pokemonList = [];
    // The function is to fetch to pokemon API and then add each item in the returned Promise to the pokemonList from above.
    function loadItems(){
        showLoadingMessage()//code to show loading image.
        return fetch(pokeAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(responseJSON){ 
            let items = responseJSON.results;
            items.forEach(function(item){
              let pokemon = {
                name: item.name,
                detailsURL: item.url
              };
              add(pokemon);
            })
            hideLoadingMessage();//code to stop the loading image.
        })
        .catch(function(error){
          console.log(`Fetch failed: ${error}`);
        })
    }
    // This funciton is to load the details of the Pokemon via fetch. If successful, the pokemon's height, weight and image of the pokemon will be store in a pokeDetails object.
    function loadDetails(currentPokemon){
        showLoadingMessage()//code to show loading image.
        let url = currentPokemon.detailsURL;
        return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(details){
            currentPokemon.height = details.height,
            currentPokemon.image = details.sprites.back_default,
            currentPokemon.types = details.types
            hideLoadingMessage();//code to stop the loading image.
        })
        .catch(function(error){
            console.log(`Fetch failed: ${error}`);
        })
    }
    function showLoadingMessage(){
        console.log(`Loading...`)
    }
    function hideLoadingMessage(){
        console.log(`Done!`)
    }
    // This is function is called through a loop from the loadItem function to add each item(pokemon) to the pokemonList from above. 
    function add(pokemon){
          pokemonList.push(pokemon);
    }
    //This function is to retrieve all available Pokemon fromt he pokemonList from above.
    function getAll(){
        return pokemonList;
    }
    // This function is to add each Pokemon a an list to be display in the web applicaiton.
    function addListItem(pokemon){
            let pokeList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            // button.classList.add('pokemon-button');
            listItem.appendChild(button);
            pokeList.appendChild(listItem);
            addClickEvent(button, pokemon);
    }
    //This function is used to add a event listener to each pokemon button created by the function above.
    function addClickEvent(button, pokemon){
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }
    function showDetails(pokemon){
        let pokeName =  pokemon.name;
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }
   
    // The following return will return the functions of this IIFE to the delcared to be used outside this scope/context
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadItems: loadItems,
        loadDeails: loadDetails
    }
})(); 

pokemonRepository.loadItems().then(function(pokemon){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
})

