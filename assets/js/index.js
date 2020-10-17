$(document).ready(function(){
    $("button").click(function (){
        $.ajax({
            type: "GET",
            url: "https://reqres.in/api/users",
            datatype: "json",
            success: function(datosApi){
                console.log(datosApi.data);
                datosApi.data.forEach(element => {
                    $(".resultado").append(`<p>${element.id} ${element.email} ${element.first_name} ${element.last_name}</p> <img src:${element.avatar}> `)
                });
                
            },
            error: function(error){

            }              
        })
    })
})

