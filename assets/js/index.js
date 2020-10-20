$(document).ready(function(){
    pokemon(25)    
    $("#boxBusquedaNombre").val("")
    $("#chartContainer").css("display", "none")
    console.log($("select").val())
})
let pokemonActual
// función llamada pokemon
let pokemon = (eleccionUsuario) =>{          
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${eleccionUsuario}`,
        datatype: "json",
        success: function(datosPokemon){
            console.log(datosPokemon.id)
            //obtener habilidades pokemon
            let habilidadPokemon = [] //arreglo que almacenará habilidades
            //recorrer arreglo api según propiedad abilities
            datosPokemon.abilities.forEach((habilidad)=> {
                habilidadPokemon.push(habilidad.ability.name)//obtener dato y agregarlo a arreglo vacio
            })
            // mapear arreglo habilidad pokemon agregando esos datos dentro de una etiqueta Li
            let habilidadPokemonLi = habilidadPokemon.map((habilidad, index, array)=>{
                return `<li> ${habilidad}</li>`
            })
            // arreglo con etiqueta de inicio y cierre de ul
            //let ul = ["</ul>","<ul>"]
            // unir arreglos habilidad pokemon li y ul
            //let habilidadPokemonHtml = ul.concat(habilidadPokemonLi) 
            //let borrar = habilidadPokemonHtml.shift() //ajustes de posición ul
            //habilidadPokemonHtml.push(borrar)//ajustes de posición ul
            //variable para facilitar la inserción html
            let habilidadPokemonHtml = habilidadPokemonLi.join(" ")           

            $("#sprite").empty()            
            $("#sprite").append(`
                <article class="message">
                    <div  class="message-header ${datosPokemon.types[0].type.name}">
                        <p>${datosPokemon.name}</p>                        
                    </div>
                    <div class="message-body is-large is-flex is-flex-direction-row">
                        <img src=${datosPokemon.sprites.front_default}>                          
                        <div class = "${datosPokemon.types[0].type.name} column is-flex is-flex-direction-row is-justify-content-space-between">
                            <div>                            
                                <ul class= is-medium>
                                    <li class= is-large>Id: #${datosPokemon.id}</li>
                                    <li>Tipo: ${datosPokemon.types[0].type.name}</li>
                                    <li>Peso: ${datosPokemon.weight / 10} kg</li>
                                    <li>Altura: ${datosPokemon.height / 10} m </li>
                                </ul>
                            </div>
                            <div>
                                ${habilidadPokemonHtml ? "<h3>Habilidades: </h3>" : ""}
                                <ul>${habilidadPokemonHtml}</ul>
                            </div>                    
                        </div>
                    </div>
                </article>`
            );
            //arreglo que almacenará hp, atk, def, etc.
            var data = []            
            // recorrer datosPokemon.stats
            datosPokemon.stats.forEach(function(e){
                data.push({y: e.base_stat, label: e.stat.name})
            })
            
            //variable gráfico de canvas JS            
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Estadísticas de batalla"
                },
                axisY: {
                    title: "PS",
                    titleFontSize: 24,
                    includeZero: true
                },
                data: [{
                    type: "column",
                    yValueFormatString: "#,### Units",
                    dataPoints: data  //este data es el arreglo de los datos obtenidos de la pokeapi                      
                }]
            })
            //renderizar grafico
            chart.render();
            $("#tituloPokemon").empty() //borra datos anteriores que hayan sido insertados            
            pokemonActual = datosPokemon.id
            return pokemonActual    
        },            
        })             
    }
    // Botón para iniciar llamada pokemon    
let inicioBusqueda = ()=>{
        let endPointUser = $("#boxBusquedaNombre").val()
    // variable que guarda los datos ingresados por el usuario
    // condicional: si se eligió buscar por ID
    if (criterioBusqueda == 1){
        let patronBusquedaNumero = /^[\d]+$/gim //busqueda por número      
        if(patronBusquedaNumero.test(endPointUser) == false){
            alert('ingrese los valores nuevamente')
        } else if(endPointUser < 1 || endPointUser > 893){
            alert('ingrese los valores nuevamente')
        } else {    
            pokemon(endPointUser) //si la validación es correcta, inicia funcion para traer datos API        
        }
    } else if(criterioBusqueda == 0){ // busqueda por nombre
        let patronBusquedaNumero = /^[A-Za-z]+$/gim       
        if(patronBusquedaNumero.test(endPointUser) == false){
            alert('ingrese los valores nuevamente')
        } else {    
            pokemon(endPointUser) //si la validación es correcta, inicia funcion para traer datos API               
        }
    }
}
$("#btn").click(inicioBusqueda)

// variable que determinará si la busqueda es por nombre o
// por id según el usuario marque en la lista
let criterioBusqueda
//click a opción lista
$("select").change(()=>{
    let a = $("select").val()
    console.log(a)
    if(a == "Id"){
        criterioBusqueda = 1        
        $("#boxBusquedaNombre").attr("placeholder", "Escriba el Id del Pokemón")    
    }else if(a == "Nombre") {
        criterioBusqueda = 0        
        $("#boxBusquedaNombre").attr("placeholder", "Escriba el Nombre del Pokemón")
    }   
})

$("#btnForw").click((e)=>{
    if(pokemonActual == 893){
        pokemonActual = 1
        pokemon(pokemonActual)
    } else {
        pokemon(pokemonActual+1)
    }
})
$("#btnBack").click((e)=>{
    if(pokemonActual == 1){
        pokemonActual = 893
        pokemon(pokemonActual)
    } else {
        pokemon(pokemonActual-1)
    }
})
$("#btnTog").click(()=>{
    $("#chartContainer").slideToggle(1000)
})
