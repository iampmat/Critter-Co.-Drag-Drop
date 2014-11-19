var correctPieces = 0;
var listOfPieces = [undefined, undefined, undefined, undefined, undefined, undefined];
var numbers = [ 1, 2, 3, 4, 5, 6 ];
var i = 0;
var temp;
$( init );

function init() {
  // Create Queue
  for ( var i=0; i<6; i++ ) {
    $('<div>' + 'q' + [i] + '</div>').attr( 'id', 'queue'+numbers[i] ).appendTo( '#queuePile' ).droppable( {
        accept: '#tilePile div',
        hoverClass: 'hovered',
        drop: handleTileDrop,
    } );
  }
  // Create the pile of tiles
  for ( var i=0; i<6; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#tilePile' ).draggable( {
      containment: '#content',
      stack: '#tilePile div',
      cursor: 'move',
      revert: 'invalid'
    } );
  }

  // Add Original Position
  $('#card1').data('originalXPos', $('#card1').offset().left);
  $('#card1').data('originalYPos', $('#card1').offset().top);

  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four', 'five', 'six' ];
  for ( var i=1; i<=6; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#tileSlots' ).droppable( {
      accept: '#tilePile div',
      hoverClass: 'hovered',
      drop: handleTileDrop,
    } );
    
  }

  // Creates droppable elements for each draggable to prevent stacking
  for ( var i=0; i<6; i++ ){
    $('#card' + numbers[i]).droppable({
      greedy: true,
      tolerance: 'intersect',
      drop: function(event,ui){
        ui.draggable.draggable('option','revert',true);
      }
    });
  }

  // Add Clicking functionality
  $('#card1').data('click', true);
  $('#card2').data('click', true);
  $('#card3').data('click', true);
  $('#card4').data('click', true);
  $('#card5').data('click', true);
  $('#card6').data('click', true);
  
  // Card jigsawing
  $('#card1').data( 'top', -1 );
  $('#card1').data( 'right', 1 );
  $('#card1').data( 'bottom', 1 );
  $('#card1').data( 'left', -1 );

  $('#card2').data( 'top', -1 );
  $('#card2').data( 'right', -1 );
  $('#card2').data( 'bottom', 1 );
  $('#card2').data( 'left', -1 );

  $('#card3').data( 'top', 1 );
  $('#card3').data( 'right', -1 );
  $('#card3').data( 'bottom', 1 );
  $('#card3').data( 'left', 1 );

  $('#card4').data( 'top', -1 );
  $('#card4').data( 'right', 1 );
  $('#card4').data( 'bottom', -1 );
  $('#card4').data( 'left', 1 );

  $('#card5').data( 'top', 1 );
  $('#card5').data( 'right', 1 );
  $('#card5').data( 'bottom', 1 );
  $('#card5').data( 'left', 1 );

  $('#card6').data( 'top', -1 );
  $('#card6').data( 'right', -1 );
  $('#card6').data( 'bottom', -1 );
  $('#card6').data( 'left', -1 );

  /*function onDrag (event, ui) {
        var offset = $(this).offset();
        var id = $(this).attr('id');
        var xPos = offset.left;
        var yPos = offset.top;
        console.log(id);
        if(yPos < 100){
          $('#' + id).position({'top': $(this).data(originalYPos), 'left' : $(this).data(originalXPos)});
        }
  }*/

  // Card rotation
  $('#card1').click(function(){
    console.log($('#card1').data('click'));
    if($('#card1').data('click') == true){
      if($(this).is('.box_rotate_90')){
        $(this).removeClass('box_rotate_90');
        $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card1').data( 'left' );
      $('#card1').data( 'left', $('#card1').data( 'bottom' ) );
      $('#card1').data( 'bottom', $('#card1').data( 'right' ) );
      $('#card1').data( 'right', $('#card1').data( 'top' ) );
      $('#card1').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card1').data( 'left' );
      $('#card1').data( 'left', $('#card1').data( 'bottom' ) );
      $('#card1').data( 'bottom', $('#card1').data( 'right' ) );
      $('#card1').data( 'right', $('#card1').data( 'top' ) );
      $('#card1').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card1').data( 'top', -1 );
      $('#card1').data( 'right', 1 );
      $('#card1').data( 'bottom', 1 );
      $('#card1').data( 'left', -1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card1').data( 'left' );
      $('#card1').data( 'left', $('#card1').data( 'bottom' ) );
      $('#card1').data( 'bottom', $('#card1').data( 'right' ) );
      $('#card1').data( 'right', $('#card1').data( 'top' ) );
      $('#card1').data( 'top', temp );
      console.log($('#card1').data( 'left'));
    } 
  }
});

$('#card2').click(function(){
  if($('#card2').data('click') == true){
    if($(this).is('.box_rotate_90')){
      $(this).removeClass('box_rotate_90');
      $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card2').data( 'left' );
      $('#card2').data( 'left', $('#card2').data( 'bottom' ) );
      $('#card2').data( 'bottom', $('#card2').data( 'right' ) );
      $('#card2').data( 'right', $('#card2').data( 'top' ) );
      $('#card2').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card2').data( 'left' );
      $('#card2').data( 'left', $('#card2').data( 'bottom' ) );
      $('#card2').data( 'bottom', $('#card2').data( 'right' ) );
      $('#card2').data( 'right', $('#card2').data( 'top' ) );
      $('#card2').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card2').data( 'top', -1 );
      $('#card2').data( 'right', -1 );
      $('#card2').data( 'bottom', 1 );
      $('#card2').data( 'left', -1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card2').data( 'left' );
      $('#card2').data( 'left', $('#card2').data( 'bottom' ) );
      $('#card2').data( 'bottom', $('#card2').data( 'right' ) );
      $('#card2').data( 'right', $('#card2').data( 'top' ) );
      $('#card2').data( 'top', temp );
    }  
  }
});

$('#card3').click(function(){
  if($('#card3').data('click') == true){
    if($(this).is('.box_rotate_90')){
      $(this).removeClass('box_rotate_90');
      $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card3').data( 'left' );
      $('#card3').data( 'left', $('#card3').data( 'bottom' ) );
      $('#card3').data( 'bottom', $('#card3').data( 'right' ) );
      $('#card3').data( 'right', $('#card3').data( 'top' ) );
      $('#card3').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card3').data( 'left' );
      $('#card3').data( 'left', $('#card3').data( 'bottom' ) );
      $('#card3').data( 'bottom', $('#card3').data( 'right' ) );
      $('#card3').data( 'right', $('#card3').data( 'top' ) );
      $('#card3').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card3').data( 'top', 1 );
      $('#card3').data( 'right', -1 );
      $('#card3').data( 'bottom', 1 );
      $('#card3').data( 'left', 1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card3').data( 'left' );
      $('#card3').data( 'left', $('#card3').data( 'bottom' ) );
      $('#card3').data( 'bottom', $('#card3').data( 'right' ) );
      $('#card3').data( 'right', $('#card3').data( 'top' ) );
      $('#card3').data( 'top', temp );
      console.log($('#card3').data( 'left'));  
    }  
  }
});

$('#card4').click(function(){
  if($('#card4').data('click') == true){
    if($(this).is('.box_rotate_90')){
      $(this).removeClass('box_rotate_90');
      $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card4').data( 'left' );
      $('#card4').data( 'left', $('#card4').data( 'bottom' ) );
      $('#card4').data( 'bottom', $('#card4').data( 'right' ) );
      $('#card4').data( 'right', $('#card4').data( 'top' ) );
      $('#card4').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card4').data( 'left' );
      $('#card4').data( 'left', $('#card4').data( 'bottom' ) );
      $('#card4').data( 'bottom', $('#card4').data( 'right' ) );
      $('#card4').data( 'right', $('#card4').data( 'top' ) );
      $('#card4').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card4').data( 'top', -1 );
      $('#card4').data( 'right', 1 );
      $('#card4').data( 'bottom', -1 );
      $('#card4').data( 'left', 1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card4').data( 'left' );
      $('#card4').data( 'left', $('#card4').data( 'bottom' ) );
      $('#card4').data( 'bottom', $('#card4').data( 'right' ) );
      $('#card4').data( 'right', $('#card4').data( 'top' ) );
      $('#card4').data( 'top', temp ); 
    }  
  }
});

$('#card5').click(function(){
  if($('#card5').data('click') == true){
    if($(this).is('.box_rotate_90')){
      $(this).removeClass('box_rotate_90');
      $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card5').data( 'left' );
      $('#card5').data( 'left', $('#card5').data( 'bottom' ) );
      $('#card5').data( 'bottom', $('#card5').data( 'right' ) );
      $('#card5').data( 'right', $('#card5').data( 'top' ) );
      $('#card5').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card5').data( 'left' );
      $('#card5').data( 'left', $('#card5').data( 'bottom' ) );
      $('#card5').data( 'bottom', $('#card5').data( 'right' ) );
      $('#card5').data( 'right', $('#card5').data( 'top' ) );
      $('#card5').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card5').data( 'top', 1 );
      $('#card5').data( 'right', 1 );
      $('#card5').data( 'bottom', 1 );
      $('#card5').data( 'left', 1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card5').data( 'left' );
      $('#card5').data( 'left', $('#card5').data( 'bottom' ) );
      $('#card5').data( 'bottom', $('#card5').data( 'right' ) );
      $('#card5').data( 'right', $('#card5').data( 'top' ) );
      $('#card5').data( 'top', temp );
    }  
  }
});

$('#card6').click(function(){
  if($('#card6').data('click') == true){
    if($(this).is('.box_rotate_90')){
      $(this).removeClass('box_rotate_90');
      $(this).addClass('box_rotate_180');
      // rotate sides
      temp = $('#card6').data( 'left' );
      $('#card6').data( 'left', $('#card6').data( 'bottom' ) );
      $('#card6').data( 'bottom', $('#card6').data( 'right' ) );
      $('#card6').data( 'right', $('#card6').data( 'top' ) );
      $('#card6').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_180')){
      $(this).removeClass('box_rotate_180');
      $(this).addClass('box_rotate_270');
      // rotate sides
      temp = $('#card6').data( 'left' );
      $('#card6').data( 'left', $('#card6').data( 'bottom' ) );
      $('#card6').data( 'bottom', $('#card6').data( 'right' ) );
      $('#card6').data( 'right', $('#card6').data( 'top' ) );
      $('#card6').data( 'top', temp );
    }
    else if($(this).is('.box_rotate_270')){
      $(this).removeClass('box_rotate_270');
      $('#card6').data( 'top', -1 );
      $('#card6').data( 'right', -1 );
      $('#card6').data( 'bottom', -1 );
      $('#card6').data( 'left', -1 );
    }  
    else{
      $(this).addClass('box_rotate_90');
      temp = $('#card6').data( 'left' );
      $('#card6').data( 'left', $('#card6').data( 'bottom' ) );
      $('#card6').data( 'bottom', $('#card6').data( 'right' ) );
      $('#card6').data( 'right', $('#card6').data( 'top' ) );
      $('#card6').data( 'top', temp );
      console.log($('#card6').data( 'left'));
    }  
  }  
});
}

// Piece Drop Function
function handleTileDrop( event, ui ) {
  var pieceSize = 117, counter = 0, result = 0, sideResult = 0;

  // Set position of piece
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  
  // Position of Newly placed Piece
  var newPiece = ui.draggable;
  var offset = newPiece.position();
  var xPos = offset.left;
  var yPos = offset.top;
  var id = newPiece.attr('id');
  
  
  for (var j = 0; j <= 6; j++) {
    // If a piece previously placed on the board is being dragged, reset it as a newPiece
    if(listOfPieces[j] == newPiece){
      listOfPieces[j] = undefined;
    }
  }  

  // Check all pieces if adjacent if the peice is dropped onto the playing board
  if($(this).attr('id') == undefined){
    for (var j = 0; j <= 6; j++) {

      // Only check piece if it's a piece
      if(typeof listOfPieces[j] === 'object'){

        // Check piece to the right
        if((listOfPieces[j].xPos == xPos + pieceSize) && (listOfPieces[j].yPos == yPos)){
          sideResult = newPiece.data( 'right' ) + listOfPieces[j].data( 'left' );
          result += sideResult;
          console.log('right' + newPiece.data( 'right' ));
          console.log('left' + listOfPieces[j].data( 'left' ));
        }

        // Check piece to the bottom
        if((listOfPieces[j].xPos == xPos) && (listOfPieces[j].yPos == yPos - pieceSize)){
          sideResult = newPiece.data( 'top' ) + listOfPieces[j].data( 'bottom' );
          result += sideResult;
          console.log('top' + newPiece.data( 'top' ));
          console.log('bottom' + listOfPieces[j].data( 'bottom' ));
        }

        // Check piece to the left
        if((listOfPieces[j].xPos == xPos - pieceSize) && (listOfPieces[j].yPos == yPos)){
          sideResult = newPiece.data( 'left' ) + listOfPieces[j].data( 'right' );
          result += sideResult;
          console.log('left' + newPiece.data( 'left' ));
          console.log('right' + listOfPieces[j].data( 'right' ));
        }

        // Check piece to the top
        if((listOfPieces[j].xPos == xPos) && (listOfPieces[j].yPos == yPos + pieceSize)){
          sideResult = newPiece.data( 'bottom' ) + listOfPieces[j].data( 'top' );
          result += sideResult;
          console.log('bottom' + newPiece.data( 'bottom' ));
          console.log('top' + listOfPieces[j].data( 'top' ));
        }
      }
    }
  }
  // Assign result -1 if the peice is being dragged into the queue.
  else {
    result = -1;
  }      
  
  if(result == 0){
    newPiece.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', 'invalid' );
    //ui.draggable.draggable( 'disable' );
    $('#' + id).data('click', false);
    // Adds the new piece to the list of all dropped
    listOfPieces[i] = newPiece;
    listOfPieces[i].xPos = xPos;
    listOfPieces[i].yPos = yPos;
    i++;
  }
  else if(result == -1){
    $('#' + id).data('click', true);
  }
  else{
    ui.draggable.draggable( 'enable' );
    $(this).droppable( 'enable' );
    ui.draggable.draggable( 'option', 'revert', true );
  }
}

function replaceDraggable(event, ui){
  
}