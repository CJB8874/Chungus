//================================================================================================================================================
//				CONTRIBUTORS						DATE LAST MODIFIED (CODE)					COMMENTS LAST UPDATED						
//================================================================================================================================================
//				Caleb Marston								11/13/2020								11/13/2020
//				Christopher Burke							
//================================================================================================================================================
//				METHODOLOGY			
//================================================================================================================================================
//	This program is based on the design principles behind the Deep Blue chess computer, that a design procedural ruleset can be very
//	effective in a game, and occasionally outperform typical machine learning approaches at non-perceptual tasks. Also this program 
//	can then be used to generate "training data" for solution using machine learning. 
//
//	The general algorithm of this program, designed by Caleb Marston, is to plot out a path of say 7 (this number can be changed) tiles ahead.
//	At every turn or action this path is then updated, which ensures that the monster will always choose a path that will maximize the amount of
//	turns it can survive. Each monster in controlled by a separately for reasons outlined below.
//================================================================================================================================================


//================================================================================================================================================
//				MAIN FUNCTION			
//================================================================================================================================================
//	The main function iterates through and uses the pathfinding functions below to find a path of the specified length for each of the 
//	monsters. If it cannot find a path of the needed length it will then look for a path that is one shorter. What is a valid path is discussed
//	below in the explenation of the pathfinding functions. Each monster is controlled individually so that the monsters can be sent in 
//	different directions to maximize the probability of survival. 
//================================================================================================================================================

survDirection = 'none';
turn =0;

function main(gameState, side){
	console.log(side)
	const myTeam = gameState.teamStates[side];
  	var moveArr = [];
  	pathState = gameState;
  	firstDude = myTeam[0];
  	secondDude = myTeam[1];
  	thirdDude = myTeam[2];
  	bestPathFound = false;
      	currSurviveDistance = -7;
      	while(bestPathFound == false && currSurviveDistance<0){
          [x,y] = firstDude.coord;
          Path = PathFind1(x,y, pathState, currSurviveDistance, side); 
          if(Path >= 0){
            bestPathFound = true;
          }
		  
          else{
          	pathState = gameState;
            currSurviveDistance ++;
            console.log("NO PATH FOUND1");
			console.log(currSurviveDistance);
          }
          
        }
		
  	Dude1Direct = survDirection;
	/*
  	bestPathFound = false;
      currSurviveDistance = -7;
      while(bestPathFound == false && currSurviveDistance<0){
         [x,y] = thirdDude.coord;
        if(PathFind3(x,y, pathState, currSurviveDistance, side) >= 0){
            bestPathFound = true;
          }
          else{
            pathState = gameState;
          	currSurviveDistance++;
            console.log("NO PATH FOUND3");
            console.log(currSurviveDistance);
          }
          
        }
  	Dude3Direct = survDirection;
    
  	bestPathFound = false;
    	currSurviveDistance = -7;
      	while(bestPathFound == false && currSurviveDistance<0){
          [x,y] = secondDude.coord;
          if(PathFind2(x,y, pathState, currSurviveDistance, side) >= 0){
            bestPathFound = true;
          }
          else{
          	pathState = gameState;
            currSurviveDistance ++;
            console.log("NO PATH FOUND2");
          }
          
        }
		
  	Dude2Direct = survDirection;
	*/
  	console.log(turn);
  	turn++;
  	//return [Dude1Direct, Dude2Direct, Dude3Direct];
	return [Dude1Direct];
}



//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			
//================================================================================================================================================
//	These functions are used recursively to find a path, within the 7x7 grid, of the given "pathLength", only avoiding tiles that have a 
//	strength of 1 or greater. Different functions give different priority to the four movement options so that the monsters will hinder
//	eachother as little as they can while maximizing tile damage to the other side. 
//	No considerations are made for the positions of other monsters in chossing the path other than the weakness in tiles other monsters
//	cause while standing on them.
//================================================================================================================================================



//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			FIRST PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================
function PathFind1(x, y, pathState, pathLength, side){
	
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.East		>
	//	3.West		<
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------

	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
		if(x<6){
		  if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind1(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				console.log('south');
				return SouthPath;
			}
		  }
		}
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind1(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				console.log('east');
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind1(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				console.log('west');
				return WestPath;
			}
		  }
		}
	  if(x>0){
		  if(pathState.tileStates[x-1][y] > 1){
			  NorthPath = PathFind1(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				console.log('north');
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.West		<
	//	3.East		>
	//	4.South		v
	//------------------------------------------------------------------------------------------------------------------------

	
	else{
	
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
		
		if(x>0){
		  if(pathState.tileStates[x-1][y] > 1){
			  NorthPath = PathFind1(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind1(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
		
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind1(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		if(x<6){
		  if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind1(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		
		
		return pathLength-1;
	
	}
	
}


//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			SECOND PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================


function PathFind2(x, y, pathState, pathLength, side){
	
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.East		>
	//	3.West		<
	//	4.South		v
	//------------------------------------------------------------------------------------------------------------------------
	
	
	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	  if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind2(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
	  if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind2(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind2(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
	  if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind2(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.West		<
	//	3.East		>
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------
	
	else{
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;

		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind2(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}		

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind2(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
		
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind2(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind2(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
		
	}
	
}


//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			THIRD PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================


function PathFind3(x, y, pathState, pathLength, side){
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.East		>
	//	3.West		<
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------
	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	 
		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){
			SouthPath = PathFind3(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
	  

		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind3(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind3(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}

		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind3(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.West		<
	//	3.East		>
	//	4.North		v
	//------------------------------------------------------------------------------------------------------------------------
	
	else{
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	 
	  
		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind3(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind3(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}

		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind3(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		
		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){
			SouthPath = PathFind3(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		
		return pathLength-1;
		
	}
}
