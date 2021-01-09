// JavaScript Document

//this is my list of Pokemons
let pokemonList = [
    {name:'Bulbasaur', type:['grass','poison'], height: 0.7}, 
    {name:'Charizard', type:['fire','flying'], height: 1.7}, 
    {name:'Squirtle', type:['water'], height: 0.5}
];

//Here I intialize global varibles that will be used throughout the script in loops and/or functions
//    The typeMsg variable will be used to store the types or type of the respective pokemon; to be used in the output message
//    The i varibale will be used as a counter in loops
let typeMsg = '';
let i = 0

//This loop will output a message to the document listing each pokemon along with its height and types.
for (;i < pokemonList.length; i++) {
//    This if-else statement will be used to form a message listing the pokemon's type based on the number of types.
    if (pokemonList[i].type.length > 1) {
        typeMsg = ' has ' + pokemonList[i].type.length + ' types of ' + pokemonList[i].type.toString().replace(',',' and ')+'.';   
    }else {
        typeMsg = ' has a type of ' + pokemonList[i].type+'.'; 
    }
//    Here I store the result, of this ternary operator, in the variable bigPoke to be appended to the output message for the bigest pokemon.
    let bigPoke =  pokemonList[i].height > 1.5 ? `- This is the tallest Pokeman`:``;
//    Here I form the output message using Template Literal form
    document.write(`${pokemonList[i].name} is ${pokemonList[i].height} meters tall and  ${typeMsg} ${bigPoke} <br>`);
}