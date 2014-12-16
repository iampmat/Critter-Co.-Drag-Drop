var listOfPieces = new Array();
var onBoardPieces = new Array();
var savedList = new Array();

var topValues = [-1, -1, 1, -1, 1, -1];
var rightValues = [1, -1, -1, 1, 1, -1];
var bottomValues = [1, 1, 1, -1, 1, -1];
var leftValues = [-1, -1, 1, 1, 1, -1];
var sides = [ 'top', 'right', 'bottom', 'left'];

var numbers = [ 1, 2, 3, 4, 5, 6 ];
var pieceSize = 1;
$( init );

function init() {

  // Create Queue
  var x = 1;
  var y = 1;
  for ( var i=0; i<6; i++ ) {
    $('<div>' + 'q' + [i] + '</div>').attr( 'id', 'queue'+numbers[i] ).appendTo( '#queuePile' ).droppable( {
        accept: '#tilePile div',
        hoverClass: 'hovered',
        drop: handleTileDrop,
    } );
    $('#q' + [i]).data( 'y', y);
    $('#q' + [i]).data( 'x', x);
    x++;
  }

  // Create the card slots
  var x = 1;
  var y = 1;
  for ( var i=1; i<=6; i++ ) {
    $('<div>' + 'slot' + [i] + '</div>').data( 'number', i ).attr( 'id', 'slot'+[i] ).appendTo( '#tileSlots' ).droppable( {
      accept: '#tilePile div',
      hoverClass: 'hovered',
      drop: handleTileDrop,
    } ); 
    if(x > 3){
      x = 1;
      y++;
    }
    $('#slot' + [i]).data( 'y', y);
    $('#slot' + [i]).data( 'x', x);
    x++;
  }

  // Create the pile of tiles
  var x = 1;
  var y = 1;
  for ( var i=0; i<6; i++ ) {
    if(savedList[i] != undefined){
      savedList[i].position( { of: $(savedList[i].settingId), my: 'left top', at: 'left top' } );
    }  
    else {
      $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#tilePile' ).draggable( {
        containment: '#content',
        stack: '#tilePile div',
        cursor: 'move',
        revert: 'invalid'
      } );
      $( '#' + 'card' + numbers[i] ).data('queue', true);
      $( '#' + 'card' + numbers[i] ).data( 'y', y);
      $( '#' + 'card' + numbers[i] ).data( 'x', x);
      listOfPieces[i] = $( '#' + 'card' + numbers[i] );
      listOfPieces[i].id = 'card' + numbers[i];
      x++;
    }
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
    $('#card' + numbers[j]).data('ori', 0);
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
        $(id).data('ori', 2);
      }
      else if($(id).is('.box_rotate_180')){
        $(id).removeClass('box_rotate_180');
        $(id).addClass('box_rotate_270');
        rotateValues(id);
        $(id).data('ori', 3);
      }
      else if($(id).is('.box_rotate_270')){
        $(id).removeClass('box_rotate_270');
        var num = id.split("d");
        console.log(num);
        $('#card' + num[1]).data('top', topValues[(num[1] - 1)]);
        $('#card' + num[1]).data('right', rightValues[(num[1] - 1)]);  
        $('#card' + num[1]).data('bottom', bottomValues[(num[1] - 1)]);
        $('#card' + num[1]).data('left', leftValues[(num[1] - 1)]);
        $(id).data('ori', 0);
      }  
      else{
        $(id).addClass('box_rotate_90');
        rotateValues(id);
        $(id).data('ori', 1);
      } 
    }
  });

// PRINT ALL PIECES

for(var i = 0; i < 6; i++){
  console.log(listOfPieces[i]);
  console.log('queue: ' + listOfPieces[i].data('queue'));
  console.log('cord: ' + '(' + listOfPieces[i].data( 'x') + ', ' + listOfPieces[i].data( 'y') + ')');
}

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

  var counter = 0, sideResult = 0;
  var reject = false;

  // Set position of piece in droppable
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  var newPiece = ui.draggable;
  var offset = newPiece.position();
  var xPos = $(this).data('x');
  var yPos = $(this).data('y');
  var id = newPiece.attr('id');
  var settingId = '#' + $(this).attr('id'); 
  var settingNum = $(this).attr('id').split('t');

  // Check if adjecent peices are matches. Droppables on the board are undefined.
  if(settingNum[1] >= 1){
    reject = false;

    console.log(id + ': ' + '(' + xPos + ', ' + yPos + ')');

    for (var j = 0; j < 6; j++) {      
      // Check if piece is on board 
      if(listOfPieces[j].data('queue') == false){
        // Check piece right
        if((listOfPieces[j].data('x') == xPos + pieceSize) && (listOfPieces[j].data('y') == yPos)){
          sideResult = newPiece.data( 'right' ) + listOfPieces[j].data( 'left' );
          if(sideResult != 0){
            reject = true;
          }  
          //console.log(' right: ' + newPiece.data( 'right' ) + (' left: ') + listOfPieces[j].data( 'left' ));
        }
        // Check piece bottom
        if((listOfPieces[j].data('x') == xPos) && (listOfPieces[j].data('y') == yPos - pieceSize)){
          sideResult = newPiece.data( 'top' ) + listOfPieces[j].data( 'bottom' );
          if(sideResult != 0){
            reject = true;
          }
          //console.log(' top: ' + newPiece.data( 'top' ) + (' bottom: ') + listOfPieces[j].data( 'bottom' ));
        }
        // Check piece left
        if((listOfPieces[j].data('x') == xPos - pieceSize) && (listOfPieces[j].data('y') == yPos)){
          sideResult = newPiece.data( 'left' ) + listOfPieces[j].data( 'right' );
          if(sideResult != 0){
            reject = true;
          }
          //console.log(' left: ' + newPiece.data( 'left' ) + (' right: ') + listOfPieces[j].data( 'right' ));
        }
        // Check piece top
        if((listOfPieces[j].data('x') == xPos) && (listOfPieces[j].data('y') == yPos + pieceSize)){
          sideResult = newPiece.data( 'bottom' ) + listOfPieces[j].data( 'top' );
          if(sideResult != 0){
            reject = true;
          }
          //console.log(' bottom: ' + newPiece.data( 'bottom' ) + (' top: ') + listOfPieces[j].data( 'top' ));
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
    $('#' + id).data('queue', false);
    // Adds the new piece to the list of all dropped
    newPiece.id = id;
    newPiece.data('x', $(this).data('x'));
    newPiece.data('y', $(this).data('y'));
    newPiece.settingId = settingId;
    for (var j = 0; j < 6; j++) {
      if(listOfPieces[j].id == id){
        listOfPieces[j] = newPiece;
        break;
      }
    } 
  }
  // Drop peice onto queue
  else if(reject == 'q'){
    $('#' + id).data('click', true);
    ui.draggable.draggable( 'option', 'revert', false );
     ui.draggable.data('queue', true);
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