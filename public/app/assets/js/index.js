
$("#mainButton").click(function(){
  $("#listaLibros").hide("slow");
  $.get( "/dameLibros", function(data) {
    $('body').scrollspy({ target: '#listaLibros' });
      console.log(data.libros);
    for(var i=0; i< data.libros.length;i++){

      $("#listaLibros").append('<div class="col-md-3">'+ data.libros[i].nombre + "<img class='img-responsive' src='" + data.libros[i].img + "'>"+ '</div>');
      //$("#listaLibros").append("<img class='img-responsive' src='" + data.libros[i].img + "'>" )
    }
    $("#listaLibros").show("slow");
    //$("#listaLibros").show("slow");
    });

  //<div class="row">
    //<div class="md-col-3"></div>
    //<div class="md-col-3"></div>
    //<div class="md-col-3"></div>
    //
    //</div>



});
