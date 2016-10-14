var towerOfHanoi =(function(){	
	var game = {};
		
	game.init = function (){		
		game.totalDisk = 7;
		game.diskHeight = 20;
		game.minMoves ={
			disks3:7,
			disks4:15,
			disks5:31,
			disks6:63,
			disks7:127
		};
		game.pegs = {
			peg1 : { topDisk : 1 , disks :[]},
			peg2 : { topDisk : null , disks :[]},
			peg3 : { topDisk : null , disks :[]}
		};
		game.jselDisk = {};
		game.fromPeg = {};
		game.moveCount = 0
	}

	game.createBoard = function(){		
		var t =1;
		$("#board").empty();
		for(t = 1 ; t <=3 ; t++){
			var towerDiv =  $("<div/>",{id:"tower" + t, class:"tower col-md-4"});	
			var deckDiv = $("<div/>",{class:"deck"});			
			var pegDiv = $("<div/>",{id: "peg"+t ,class:"peg peg" + t });						
			towerDiv.append(pegDiv);
			towerDiv.append(deckDiv);				
			$("#board").append(towerDiv);			
		}		
	}
	game.setGame = function(totDisk){	
		game.createBoard(totDisk);
		game.init();
		game.totalDisk = totDisk;
		var level = totDisk;
		var i=1;
		for(i = 1; i <= totDisk ; i++)
		{
			game["d" + i] = {id:i}		
			game.pegs.peg1.disks.push(game["d" + i]);
			var d = $("<div/>",{id:i,class:'disk' + " disk" + i , draggable:"false",style:"bottom:" + (game.diskHeight * level) + "px"});
			$("#tower1").append(d);
			level--;
		}		
	}

	game.decorateDisk = function(diskEle){
		var disk=diskEle;
		game.jselDisk =  disk;
		game.fromPeg =  game.pegs[disk.parent().children('.peg').attr("id")];		
		var currDisk = game["d" + disk.attr("id")];
		game.currDisk = currDisk;		
		if(game.fromPeg.topDisk == currDisk.id){
			disk.attr("draggable",true);
			disk.css('cursor','pointer');	
		}else{
			disk.attr("draggable",false)
			disk.css('cursor','not-allowed');
		}	
	}

	game.isValidMove = function(targetPeg,targetDisk){		
		return targetPeg.topDisk===null || targetPeg.topDisk > targetDisk.id;
	}

	game.move = function(targetPeg){
		 var jTargetDiskObj = game.jselDisk;
		    var targetDisk = game["d" + jTargetDiskObj.attr("id")]; 
		    var jTargetPegObj = targetPeg;
			var targetPeg = game.pegs[jTargetPegObj.attr("id")];        

			if(game.isValidMove(targetPeg,targetDisk)){
				//Remove taget disk from originating peg
		        game.fromPeg.disks.splice(game.fromPeg.disks.indexOf(targetDisk),1);        
		        //Change the originating pegs top disk
		        if(game.fromPeg.disks.length>0){
		        	game.fromPeg.topDisk = game.fromPeg.disks[0].id;	
		        }else{
		        	game.fromPeg.topDisk = null;
		        }

		        //Add target disk to target peg
		        targetPeg.disks.push(targetDisk);        
		        targetPeg.topDisk = jTargetDiskObj.attr("id");
		        
		        // Show the move in UI
		        jTargetDiskObj.css("bottom",game.diskHeight * targetPeg.disks.length);                
		        jTargetPegObj.parent().append(jTargetDiskObj);			        
		        game.moveCount++;
			}
	}

	game.getMoveCount = function(){
		return game.moveCount;
	}

	game.getMinMoves = function(){
		return game.minMoves["disks" + game.totalDisk];
	}
	
	return {
		start : game.setGame,
		move : game.move,
		decorateDisk : game.decorateDisk,
		moveCount : game.getMoveCount,
		minMoves : game.getMinMoves
	}

})();	