var correctPieces = 0;
var listOfPieces = [undefined, undefined, undefined, undefined, undefined, undefined];
var savedList = [undefined, undefined, undefined, undefined, undefined, undefined];

var topValues = [-1, -1, 1, -1, 1, -1];
var rightValues = [1, -1, -1, 1, 1, -1];
var bottomValues = [1, 1, 1, -1, 1, -1];
var leftValues = [-1, -1, 1, 1, 1, -1];
var sides = [ 'top', 'right', 'bottom', 'left'];

var numbers = [ 1, 2, 3, 4, 5, 6 ];
var i = 0;
var temp;
var pieceSize = 117;
$( init );

function onload(){
  if(savedList[0] != undefined){

  }
  else {
    init();
  }
}


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

  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four', 'five', 'six' ];
  for ( var i=1; i<=6; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#tileSlots' ).droppable( {
      accept: '#tilePile div',
      hoverClass: 'hovered',
      drop: handleTileDrop,
    } );
    
  }

  // Creates droppable elements for each draggable to prevent stacking pieces
  for ( var i=0; i<6; i++ ){
    $('#card' + numbers[i]).droppable({
      greedy: true,
      tolerance: 'intersect',
      drop: function(event,ui){
        ui.draggable.draggable('option','revert',true);
      }
    });
  }

  // Adds side values to all pieces 
  for ( var j = 0; j<6; j++ ) {
    $('#card' + numbers[j]).data('click', true);
    $('#card' + numbers[j]).data('top', topValues[j]);
    $('#card' + numbers[j]).data('right', rightValues[j]);  
    $('#card' + numbers[j]).data('bottom', bottomValues[j]);
    $('#card' + numbers[j]).data('left', leftValues[j]);
  }

  // Rotate pieces
  $('body').click(function(e){
    var id = '#' + e.target.id;
    if($(id).data('click') == true){
      if($(id).is('.box_rotate_90')){
        $(id).removeClass('box_rotate_90');
        $(id).addClass('box_rotate_180');
        rotateValues(id);
      }
      else if($(id).is('.box_rotate_180')){
        $(id).removeClass('box_rotate_180');
        $(id).addClass('box_rotate_270');
        rotateValues(id);
      }
      else if($(id).is('.box_rotate_270')){
        $(id).removeClass('box_rotate_270');
        var num = id.split("d");
        console.log(num);
        $('#card' + num[1]).data('top', topValues[(num[1] - 1)]);
        $('#card' + num[1]).data('right', rightValues[(num[1] - 1)]);  
        $('#card' + num[1]).data('bottom', bottomValues[(num[1] - 1)]);
        $('#card' + num[1]).data('left', leftValues[(num[1] - 1)]);
      }  
      else{
        $(id).addClass('box_rotate_90');
        rotateValues(id);
      } 
    }
  });
}

function rotateValues ( id ) {
  temp = $(id).data( 'left' );
  $(id).data( 'left', $(id).data( 'bottom' ) );
  $(id).data( 'bottom', $(id).data( 'right' ) );
  $(id).data( 'right', $(id).data( 'top' ) );
  $(id).data( 'top', temp );
}

// Piece Drop Function
function handleTileDrop( event, ui ) {

  var counter = 0, result = 0, sideResult = 0;
  var reject = false;

  // Set position of piece in droppable
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  var newPiece = ui.draggable;
  var offset = newPiece.position();
  var xPos = offset.left;
  var yPos = offset.top;
  var id = newPiece.attr('id');
  var setting = $(this).attr('id');
  
  // Already dragged peices are reset so they can be dragged again
  for (var j = 0; j <= 6; j++) {
    if(listOfPieces[j] == newPiece){
      listOfPieces[j] = undefined;
    }
  }

  // Check if adjecent peices are matches. Droppables on the board are undefined.
  if(setting == undefined){
    reject = false;
    for (var j = 0; j <= 6; j++) {      
      // Only array elements if it's a piece 
      if(listOfPieces[j] != undefined){
        // Check piece right
        if((listOfPieces[j].xPos == xPos + pieceSize) && (listOfPieces[j].yPos == yPos)){
          sideResult = newPiece.data( 'right' ) + listOfPieces[j].data( 'left' );
          if(sideResult != 0){
            reject = true;
          }  
          console.log(' right: ' + newPiece.data( 'right' ) + (' left: ') + listOfPieces[j].data( 'left' ));
        }
        // Check piece bottom
        if((listOfPieces[j].xPos == xPos) && (listOfPieces[j].yPos == yPos - pieceSize)){
          sideResult = newPiece.data( 'top' ) + listOfPieces[j].data( 'bottom' );
          if(sideResult != 0){
            reject = true;
          }
          console.log(' top: ' + newPiece.data( 'top' ) + (' bottom: ') + listOfPieces[j].data( 'bottom' ));
        }
        // Check piece left
        if((listOfPieces[j].xPos == xPos - pieceSize) && (listOfPieces[j].yPos == yPos)){
          sideResult = newPiece.data( 'left' ) + listOfPieces[j].data( 'right' );
          if(sideResult != 0){
            reject = true;
          }
          console.log(' left: ' + newPiece.data( 'left' ) + (' right: ') + listOfPieces[j].data( 'right' ));
        }
        // Check piece top
        if((listOfPieces[j].xPos == xPos) && (listOfPieces[j].yPos == yPos + pieceSize)){
          sideResult = newPiece.data( 'bottom' ) + listOfPieces[j].data( 'top' );
          if(sideResult != 0){
            reject = true;
          }
          console.log(' bottom: ' + newPiece.data( 'bottom' ) + (' top: ') + listOfPieces[j].data( 'top' ));
        }
      }
    }
  }
  // Assign result -10 if the peice is being dragged not being dragged into the playing board
  else {
    reject = 'q';
  }      
  // Drop peice onto board
  if(!reject){
    newPiece.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', 'invalid' );
    $('#' + id).data('click', false);
    // Adds the new piece to the list of all dropped
    newPiece.xPos = xPos;
    newPiece.yPos = yPos;
    newPiece.queue = false;
    for (var j = 0; j <= 6; j++) {
      if(listOfPieces[j] == undefined){
        listOfPieces[j] = newPiece;
        break;
      }
    } 
  }
  // Drop peice onto queue
  else if(reject == 'q'){
    $('#' + id).data('click', true);
    ui.draggable.draggable( 'option', 'revert', false );
    for (var j = 0; j <= 6; j++) {
      if(listOfPieces[j] == ui.draggable){
        listOfPieces[j] = undefined;
      }
    } 
  }
  // Revert to last position 
  else{
    ui.draggable.draggable( 'enable' );
    $(this).droppable( 'enable' );
    ui.draggable.draggable( 'option', 'revert', true );
  }
  saveBoard();
}
// Try printing the whole array of pieces to see if they are stored correctly!
function saveBoard (event, ui) {
  var k = 0;
  while(listOfPieces[k] != undefined){
    savedList[k] = listOfPieces[k];
    k++;
  }
}