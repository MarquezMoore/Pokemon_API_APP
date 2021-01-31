// JavaScript Document

let pokemonRepository = (function() {
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/?limit=115`;
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
              console.log(pokemon);
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
    function constructDetailModal(pokeName, pokeHeight, pokeImage, pokeType){
        return new Promise (function(resolve, reject){
            let detailModalContainer = document.querySelector('.detail-modal-container');
            let modal = document.createElement('div');
            
            detailModalContainer.innerHTML = '';
            modal.classList.add('modal');
            let modalHeader = document.createElement('section');
            modalHeader.classList.add('modal__header');
            let modalTitle = document.createElement('h1');
            modalTitle.innerText = pokeName;
            let modalClose = document.createElement('button');
            modalClose.classList.add('modal__close');
            modalClose.innerText = 'Close';
            let modalCopy = document.createElement('section');
            modalCopy.classList.add('modal__copy');
            let modalImage = document.createElement('img');
            modalImage.setAttribute('src', pokeImage);
            let modalText = document.createElement('p');
            modalText.innerText = `${pokeName} is ${pokeHeight} meter(s) tall with type(s) of ${pokeType}!`

            // Appendaging of elements to modal container and modal
            detailModalContainer.appendChild(modal);
            modal.appendChild(modalHeader);
            modal.appendChild(modalCopy);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(modalClose);
            modalCopy.appendChild(modalImage);
            modalCopy.appendChild(modalText);

            // promise resolve pass the modal container to be handled in the show details function
            resolve(detailModalContainer);
            reject('Unable to complete task...');
            
        });
    }
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            let pokeName =  pokemon.name;
            let pokeHeight = pokemon.height;
            let pokeImage = pokemon.image;
            let pokeType = getPokemonTypes(pokemon);
            constructDetailModal(pokeName, pokeHeight, pokeImage, pokeType)
            .then(function(result){
                let modalClose = document.querySelector('.modal__close');
            // code to run upon successful promise completion
                // make modal visable
                result.classList.add('visable');
                modalClose.focus(); // places focus to modal close button so that is can be closed with enter and space keys 
                // adding of event listeners for modal closure
                window.addEventListener('keydown', function(e){
                    if(e.key === 'Escape') hideModal();
                })
                modalClose.addEventListener('click', function(){
                    hideModal();
                });
                result.addEventListener('click', function(e){
                    if(e.target === result && result.classList.contains('visable')) hideModal();
                })
            })
            .catch(function(result){
                // code to run upon unsuccessful promise completion
                console.log(result);
            })
        });
    }
    function getPokemonTypes(pokemon){
        let unparsedTypeList = pokemon.types;
        let parsedTypeList = [];
        let pokeTypeString;
        // The following loop loops through the unparsedTypeList to select and stores each pokemon type for for each pokemon.
        for(let i = 0; i < unparsedTypeList.length; i++){
            let currentItem = unparsedTypeList[i];
            let currentType = currentItem.type.name;
            parsedTypeList.push(currentType);
        }
        // Parses the pokeTypeList into a string
        pokeTypeString = parsedTypeList.toString().replace(',', ' and ');
        return pokeTypeString;
    }
    // function to hide modal 
    function hideModal(){
        let detailModalContainer = document.querySelector('.detail-modal-container');
        detailModalContainer.classList.remove('visable');
    }

   
    // The following return will return the functions of this IIFE to be used outside this scope/context
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadItems: loadItems,
        loadDeails: loadDetails
    }
})(); 

pokemonRepository.loadItems()
.then(function(pokemonList){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
})

