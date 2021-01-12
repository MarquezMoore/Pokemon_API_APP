// JavaScript Document

//this is my list of Pokemons
let pokemonRepository = (function() {
    let pokemonList = [
        {name:'Bulbasaur', type:['grass','poison'], height: 0.7}, 
        {name:'Charizard', type:['fire','flying'], height: 1.7}, 
        {name:'Squirtle', type:['water'], height: 0.5}
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
    
    return {
        add: add,
        getAll: getAll
    }
})(); 


//This loop will output a message to the document listing each pokemon along with its height and types.
pokemonRepository.getAll().forEach(function(pokemon){
//Here I intialize global varibles that will be used throughout the script in loops and/or functions
//    The typeMsg variable will be used to store the types or type of the respective pokemon; to be used in the output message
    let typeMsg = '';
//    This if-else statement will be used to form a message listing the pokemon's type based on the number of types.
    if (pokemon.type.length > 1) {
        typeMsg = ' has ' + pokemon.type.length + ' types of ' + pokemon.type.toString().replace(',',' and ')+'.';   
    }else {
        typeMsg = ' has a type of ' + pokemon.type+'.'; 
    }
//    Here I store the result, of this ternary operator, in the variable bigPoke to be appended to the output message for pokemon pokemons of 1.5 meters talls.
    let bigPoke =  pokemon.height > 1.5 ? `- Wow, this is a big pokemon!`:``;
//    Here I form the output message using Template Literal form
    document.write(`${pokemon.name} is ${pokemon.height} meters tall and  ${typeMsg} ${bigPoke} <br>`);
});


