$(document).ready(function(){	
	$('#game').on('mouseenter','.disk',function(){	
		towerOfHanoi.decorateDisk($(this))
	})


	$('#game').on('dragenter','.peg',function(event){		
		event.preventDefault();
        event.stopPropagation();
	})

	$('#game').on('dragover','.peg',function(event){
		event.preventDefault();
        event.stopPropagation();        
	})

	$('#game').on('drop','.peg',function(event){
		event.preventDefault();
        event.stopPropagation();       
       	towerOfHanoi.move($(event.target))		
       	$("#moves").html(towerOfHanoi.moveCount());
	});	

});

function dragstart_handler(event){
	event.dataTransfer.setData("text/plain", event.target.id);
}

function resetGame(){
	startGame();
}

function newGame(){
	$("#rules").show();
	$("#game").hide();
}

function startGame(){
	towerOfHanoi.start($(".select").val());	
	$("#rules").hide();
	$("#game").show();
	$("#moves").html(towerOfHanoi.moveCount());
	$("small").html("Best : " + towerOfHanoi.minMoves() + " moves");
};
