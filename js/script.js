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
    function addListItem(pokemon){
            let pokeList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('button-new-style');
            listItem.appendChild(button);
            pokeList.appendChild(listItem);
            button.addEventListener('click', function(event){
                let poke = event.target.innerText;
                alert(`You have selected:  ${poke}`);
            })
    }
   
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    }
})(); 


//This loop will output a message to the document listing each pokemon along with its height and types.
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});