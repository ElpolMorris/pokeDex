$(document).ready(function(){
    pokemon(25)    
})

// función llamada pokemon
let pokemon = (eleccionUsuario) =>{          
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${eleccionUsuario}`,
        datatype: "json",
        success: function(datosPokemon){            
            $("#sprite").empty()
            $("#sprite").append(`<img src=${datosPokemon.sprites.front_default}>`)
            //arreglo que almacenará hp, atk, def, etc.
            var data = []
            // recorrer datosPokemon.stats
            datosPokemon.stats.forEach(function(e){
                data.push({y: e.base_stat, label:e.base_stat})
            })            
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Características Pokemón"
                },
                axisY: {
                    title: "Units",
                    titleFontSize: 24,
                    includeZero: true
                },
                data: [{
                    type: "column",
                    yValueFormatString: "#,### Units",
                    dataPoints: data                        
                }]
            })
            chart.render();
            },            
        })             
    }
// Botón para iniciar llamada pokemon    
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






