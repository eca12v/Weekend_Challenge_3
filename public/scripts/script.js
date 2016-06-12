$(document).ready(function(){
  //clicking equals button will start the sendToServerFunction declared below
  $('#submit').click(function(){
    console.log('submit has been clicked');
    sendToServerFunction();
  });
  //clear button clears the two inputs and the paragraph where the response is
  $('#clear').click(function(){
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    $('p').html('');
  });
});
//inserts response in our pparagraph
var serverResponse = function(response){
  $('p').html(response);
};

//function that is called on clicking equals/submit button
var sendToServerFunction = function(){
  console.log('started sendToServerFunction');
  //creating object to send to server
  var x = $('#firstNumber').val();
  var y = $('#secondNumber').val();
  var operation = $('#symbol').val();
  var serverObject = {'x': x, 'y': y, 'operation': operation};
  console.log(serverObject);
  //sending object to server via ajax/POST
  $.ajax({
    type: 'POST',
    data: serverObject,
    url: '/equate',
    success: function(data){
      console.log('post data: ' + data);
      //calls the function that sends the server response to the paragraph in our html
      serverResponse(data);
    },
    error: function(){
         console.log( 'error connecting to server' );
    }
  });
};
