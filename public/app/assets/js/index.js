$("#listaLibros").hide("slow");
$("#mainButton").click(function(){
 var autor = $("#hola").val();
  $.get( "/getBookcase?author=" + autor, function(data) {
    console.log(data);
    $('body').scrollspy({ target: '#listaLibros' });
      //console.log(data.libros);
    for(var i=0; i< 15;i++){
      if(data[i].img!="") {
        $("#listaLibros").append('<div class="col-md-3">' + data[i].title + "<img class='librillo img-responsive' src='" + data[i].img + "'>" + '</div>');
        //$("#listaLibros").append("<img class='img-responsive' src='" + data.libros[i].img + "'>" )
      }
    }
    $("#listaLibros").show("slow");
    //$("#listaLibros").show("slow");
    });

  var json_awser;

  //<div class="row">
    //<div class="md-col-3"></div>
    //<div class="md-col-3"></div>
    //<div class="md-col-3"></div>
    //
    //</div>
});

$(".librillo").click(function(){
  $(this).append('<div class="hola col-md-3"><h2>Pertenece a <small>Sergey Arellano</small></h2><br><p>Se encuentra en Móstoles City</p></div>')
  $(".hola").show("slow");
});
