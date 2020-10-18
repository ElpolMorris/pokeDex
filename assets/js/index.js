$(document).ready(function(){
    pokemon(25)
    
})


let pokemon = (eleccionUsuario) =>{          
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${eleccionUsuario}`,
        datatype: "json",
        success: function(datosPokemon){
            
            $("#sprite").empty()
            $("#sprite").append(`<img src=${datosPokemon.sprites.front_default}>`)
            },            
        })             
    }
    
$("#btn").click(()=>{
    let endPointUser = $("input").val()
    let patronBusquedaNumero = /^[\d]+$/gim    
    if(patronBusquedaNumero.test(endPointUser) == false){
        alert('ingrese los valores nuevamente')
    } else if(endPointUser < 1 || endPointUser > 834){
        alert('ingrese los valores nuevamente')
    } else {

        pokemon(endPointUser)
    }
})


