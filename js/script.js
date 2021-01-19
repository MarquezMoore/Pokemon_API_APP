// JavaScript Document

//this is my list of Pokemons
let pokemonRepository = (function() {
    let pokemonList = [
        {name:'Bulbasaur', type:['grass','poison'], height: 0.7}, 
        {name:'Charizard', type:['fire','flying'], height: 1.7}, 
        {name:'Squirtle', type:['water'], height: 0.5},
    ];
    
    function add(pokemon){
        if(typeof pokemon !== 'object') {
            alert (typeof pokemon);
        }else if(Object.keys(pokemon) !== ['name','type','height']){
          alert('Please include name, type(s), and height.');
        }else{
          pokemonList.push(pokemon);
        }
    }
    function getAll(){
        return pokemonList;
    }
    // The parameter in the function below is the pokemon object passed through each loop of the for loop calling this function
    function addListItem(pokemon){
            let pokeList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            // button.classList.add('button-new-style');
            listItem.appendChild(button);
            pokeList.appendChild(listItem);
            button.addEventListener('click', function() {
                showDetails(pokemon);
            })
    }
    function showDetails(pokemon){
        let pokeName =  pokemon.name;
        alert(`You have selected: ${pokeName}`);
    }
   
    // The following return will return the functions of this IIFE to the delcared varible to be used outside
    // this scope/context
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    }
})(); 

pokemonRepository.getAll().forEach(pokemonRepository.addListItem);