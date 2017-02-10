
// JavaScript source code
var connect4 = {};

connect4.currentState = [];
connect4.turn = 1;
connect4.pickedColumn;

for (var A = 0 ; A < 42 ; A++) {
	connect4.currentState.push(-1);
}

connect4.game = function() {
	do {

		if((this.turn % 2) != 0) {

				this.turn = this.turn + 1;
    		dropColumn = this.requestUserColumn();

			if(dropColumn == 0)
			{
				connect4.AddShape(0, 1);
			}
			else if (dropColumn == 1)
			{
				connect4.AddShape(1, 1);
			}
			else if (dropColumn == 2)
			{
				connect4.AddShape(2, 1);
			}
			else if (dropColumn == 3)
			{
				connect4.AddShape(3, 1);
			}
			else if (dropColumn == 4)
			{
				connect4.AddShape(4, 1);
			}
			else if (dropColumn == 5)
			{
				connect4.AddShape(5, 1);
			}
			else if (dropColumn == 6)
			{
				connect4.AddShape(6, 1);
			}
		}
		else {

			this.turn = this.turn + 1;
			dropColumn = this.AI();
			if(dropColumn == 0)
			{
				connect4.AddShape(0, 2);
			}
			else if (dropColumn == 1)
			{
				connect4.AddShape(1, 2);
			}
			else if (dropColumn == 2)
			{
				connect4.AddShape(2, 2);
			}
			else if (dropColumn == 3)
			{
				connect4.AddShape(3, 2);
			}
			else if (dropColumn == 4)
			{
			connect4.AddShape(4, 2);
			}
			else if (dropColumn == 5)
			{
				connect4.AddShape(5, 2);
			}
			else if (dropColumn == 6)
			{
				connect4.AddShape(6, 2);
			}
		}

                draw();


	} while((this.checkForWinner() == 0) && (this.boardFull() == false)  || this.turn == 50);

	//alert(connect4.currentState.toString());
	if(this.checkForWinner() == 1)
	{
		alert("Player One wins");
	}
	else if(this.checkForWinner() == 2)
	{
		alert("Player Two wins");
	}
	else {
		alert("Tie Game");
	}

	stopSim = true;

}

connect4.AddShape = function(dropColumn, playerID) {

	if (dropColumn < 0 || dropColumn > 6) {return false;}

	if (playerID != 1 && playerID !=2) {return false;}

	if (this.currentState[dropColumn] != -1) {return false;}

 	for(i = 5; i > -1; i--) {

		pos = (i * 7) + dropColumn;

	    if (this.currentState[pos] == -1) {
            this.currentState[pos] = playerID;
            return true;
        }
	}

	return false;
}

connect4.boardFull = function() {

	if((this.currentState.indexOf(-1,0)) == -1)
	{
		return true;
	}
	else if((this.currentState.indexOf(-1,0)) != -1)
	{
		return false;
	}
}

connect4.checkForWinner = function() {

	for(i = 0; i < 42; i++) {

		if((this.currentState[i]    == 1) &&   			//Four to right
		   (this.currentState[i+1]  == 1) &&
		   (this.currentState[i+2]  == 1) &&
		   (this.currentState[i+3]  == 1)) {
			if( i == 4  || i == 5  || i == 6  ||
				i == 11 || i == 12 || i == 13 ||
				i == 18 || i == 19 || i == 20 ||
				i == 25 || i == 26 || i == 27 ||
				i == 32 || i == 33 || i == 34 ||
				i == 39 || i == 40 || i == 41) {
				break;
			}
			return 1;

		}
		else if((this.currentState[i] == 1) && 		//Four up
		   (this.currentState[i+7]    == 1) &&
		   (this.currentState[i+14]   == 1) &&
		   (this.currentState[i+21]   == 1)) {

			return 1;

		}
		else if((this.currentState[i] == 1) &&
		   (this.currentState[i+8]    == 1) &&
		   (this.currentState[i+16]   == 1) &&
		   (this.currentState[i+24]   == 1)) {

			if( i > 20  || i == 18 || i == 4  || i == 5  || i == 6 ||
      	        i == 11 || i == 12 || i == 13 || i == 19 || i == 20 ) {
				break;
			}
			return 1;
		}
		else if((this.currentState[i]      == 1) &&
		       (this.currentState[i+6]     == 1) &&
		       (this.currentState[i+12]    == 1) &&
		       (this.currentState[i+18]    == 1)) {

				if( i > 20 || i == 14 || i == 0 || i == 1  || i == 2 ||
      	            i == 7 || i == 8  || i == 9 || i == 15 || i == 16 ) {
					break;
				}
			return 1;

		}

		if((this.currentState[i]    == 2) &&   			//Four to right
		   (this.currentState[i+1]  == 2) &&
		   (this.currentState[i+2]  == 2) &&
		   (this.currentState[i+3]  == 2)) {

			if( i == 4  || i == 5  || i == 6  ||
				i == 11 || i == 12 || i == 13 ||
				i == 18 || i == 19 || i == 20 ||
				i == 25 || i == 26 || i == 27 ||
				i == 32 || i == 33 || i == 34 ||
				i == 39 || i == 40 || i == 41) {
				break;
			}
			return 2;

		}
		else if((this.currentState[i] == 2) && 		//Four up
		   (this.currentState[i+7]    == 2) &&
		   (this.currentState[i+14]   == 2) &&
		   (this.currentState[i+21]   == 2)) {

			return 2;

		}
		else if((this.currentState[i]    == 2) &&
		        (this.currentState[i+8]  == 2) &&
		        (this.currentState[i+16] == 2) &&
		        (this.currentState[i+24] == 2)) {

				if( i > 20  || i == 18 || i == 4  || i == 5  || i == 6 ||
      	            i == 11 || i == 12 || i == 13 || i == 19 || i == 20 ) {
				    break;
				}
			return 2;

		}
		else if((this.currentState[i]    == 2) &&
		        (this.currentState[i+6]  == 2) &&
		        (this.currentState[i+12] == 2) &&
		        (this.currentState[i+18] == 2)) {
			    if( i > 20 || i == 14 || i == 0 || i == 1  || i == 2 ||
      	            i == 7 || i == 8  || i == 9 || i == 15 || i == 16 ) {
				    break;
				}
			return 2;

		}
	}
	return 0;
}

connect4.requestUserColumn= function()  //RETURNS # 0-6
{
  var column = prompt("Select a column: ");

  return column;
}


connect4.AI= function() //RETURNS # 0-6
{
          for(var i = 0; i<42; i++)
          {

               currentColumn = i%7;
          if(this.currentState[currentColumn] != -1)
               {
           break;
               }    //0 == player && 1 == AI

               if(currentColumn>=3 &&
                this.currentState[i] ==-1   &&
                this.currentState[i-1] ==2 &&
                this.currentState[i-2] ==2
                && this.currentState[i-3] == 2) //XXX_
               {
                return currentColumn;
              }

              else if(currentColumn<=3 &&
               this.currentState[i] ==-1   &&
               this.currentState[i+1] ==2 &&
               this.currentState[i+2] ==2
               && this.currentState[i+3] == 2) //_XXX
              {
               return currentColumn;
              }
               else if(currentColumn>=2 &&
                this.currentState[i] ==-1   &&
                this.currentState[i+1] ==2 &&
                this.currentState[i-1] ==2
                && this.currentState[i-2] == 2) //XX_X
               {
                return currentColumn;
               }
               else if(currentColumn>=1 &&
                this.currentState[i] ==-1   &&
                this.currentState[i+1] ==2 &&
                this.currentState[i+2] ==2
                && this.currentState[i-1] == 2) //X_XX
               {
                return currentColumn;
               }
               else if(
                this.currentState[i] == -1 && //     _
                this.currentState[i+7] == 2 &&//    X
                this.currentState[i+14] ==2   //    X
                && this.currentState[i+21] == 2)  //X
               {
                return currentColumn;
               }
               else if(currentColumn>=3 &&
                this.currentState[i] == -1 &&   //         _
                this.currentState[i+6] == 2 &&  //      X
                this.currentState[i+12] ==2     //     X
                && this.currentState[i+18] == 2
              && this.currentState[i+7]!=-1)   //X
               {
                return currentColumn;
               }
               else if( currentColumn>=2 &&currentColumn<=5 &&
                this.currentState[i-6] == 2 && //      X
                this.currentState[i] == -1 &&//       _
                this.currentState[i+6] ==2      //  X
                && this.currentState[i+12] == 2
              && this.currentState[i+7]!=-1) //X
               {
                return currentColumn;
               }
               else if(currentColumn>=1 && currentColumn<=4 &&
                this.currentState[i-12] == 2 && //         X
                this.currentState[i-6] == 2 &&//         X
                this.currentState[i] ==-1   //          _
                && this.currentState[i+6] == 2
              && this.currentState[i+7]!=-1)  // X
               {
                return currentColumn;
               }
               else if(currentColumn<=3 &&
                this.currentState[i-18] == 2 &&   //           X
                this.currentState[i-12] == 2 &&   // X
                this.currentState[i-6] ==2      // X
                && this.currentState[i] == -1)     // _
               {
                return currentColumn;
               }
               else if(  currentColumn<=3 &&
                this.currentState[i] == -1 && //_
                this.currentState[i+8] == 2 &&// X
                this.currentState[i+16] ==2   //  X
                && this.currentState[i+24] == 2
              && this.currentState[i+7]!=-1)  //   X
               {
                return currentColumn;
               }
               else if(currentColumn<=1 && currentColumn<=4 &&
                this.currentState[i-8] == 2 && //X
                this.currentState[i] == -1 &&//     _
                this.currentState[i+8] ==2   //     X
                && this.currentState[i+16] == 2
              && this.currentState[i+7]!=-1)  //     X
               {
                return currentColumn;
               }
               else if( currentColumn<=2 && currentColumn<=5 &&
                this.currentState[i-16] == 2 && //X
                this.currentState[i-8] == 2 &&//    X
                this.currentState[i] ==-1   //        _
                && this.currentState[i+8] == 2
              && this.currentState[i+7]!=-1)  //       X
               {
                return currentColumn;
               }
               else if( currentColumn<=3 &&
                this.currentState[i-24] == 2 && //X
                this.currentState[i-16] == 2 &&//    X
                this.currentState[i-8] ==2   //        X
                && this.currentState[i] == -1)  //       _
               {
                return currentColumn;
               }
              else if(currentColumn>=3 &&
           this.currentState[i]   == -1 &&
           this.currentState[i-1] == 1  &&
           this.currentState[i-2] == 1  &&
           this.currentState[i-3] == 1) //000_
          {
           return currentColumn;
          }
          else if(currentColumn<=3 &&
        this.currentState[i]   == -1 &&
        this.currentState[i+1] == 1  &&
        this.currentState[i+2] == 1  &&
        this.currentState[i+3] == 1) //_000
        {
        return currentColumn;
        }

          else if(currentColumn>=2 &&
           this.currentState[i] ==-1   &&
           this.currentState[i+1] ==1 &&
           this.currentState[i-1] ==1
           && this.currentState[i-2] == 1) //00_0
          {
           return currentColumn;
          }

          else if(currentColumn>=1 &&
           this.currentState[i] ==-1   &&
           this.currentState[i+1] ==1 &&
           this.currentState[i+2] ==1
           && this.currentState[i-1] == 1) //0_00
          {
           return currentColumn;
          }

          else if(
           this.currentState[i] == -1 &&   //  _
           this.currentState[i+7] == 1 &&  // 0
           this.currentState[i+14] ==1     // 0
           && this.currentState[i+21] == 1) //0
          {
           return currentColumn;
          }

          else if(currentColumn>=3 &&
           this.currentState[i] == -1 &&   //        _
           this.currentState[i+6] == 1 &&  //     0
           this.currentState[i+12] ==1     //    0
           && this.currentState[i+18] == 1
          && this.currentState[i+7]!=-1)  //0
          {
           return currentColumn;
          }

          else if(currentColumn>=2 && currentColumn<=5 &&
           this.currentState[i-6] == 1 && //       0
           this.currentState[i] == -1 &&//        _
           this.currentState[i+6] ==1   //     0
           && this.currentState[i+12] == 1
         && this.currentState[i+7]!=-1) //0
          {
           return currentColumn;
          }
          else if(currentColumn>=1 && currentColumn<=4 &&
           this.currentState[i-12] == 1 && //        0
           this.currentState[i-6] == 1 &&//        0
           this.currentState[i] ==-1   //         _
           && this.currentState[i+6] == 1
         && this.currentState[i+7]!=-1)  // 0
          {
           return currentColumn;
          }

          else if( currentColumn<=3 &&
           this.currentState[i-18] == 1 && //    0
           this.currentState[i-12] == 1 &&//    0
           this.currentState[i-6] ==1   //    0
           && this.currentState[i] == -1)  // _
          {
           return currentColumn;
          }

          else if( currentColumn<=3 &&
           this.currentState[i] == -1 && //_
           this.currentState[i+8] == 1 &&// 0
           this.currentState[i+16] ==1   //  0
           && this.currentState[i+24] == 1
         && this.currentState[i+7]!=-1)  //   0
          {
           return currentColumn;
          }

          else if(currentColumn<=1 && currentColumn<=4 &&
           this.currentState[i-8] == 1 && //0
           this.currentState[i] == -1 &&//     _
           this.currentState[i+8] ==1   //     0
           && this.currentState[i+16] == 1
         && this.currentState[i+7]!=-1)  //     0
          {
           return currentColumn;
          }
          else if(currentColumn<=2 && currentColumn<=5 &&
           this.currentState[i-16] ==1 && //0
           this.currentState[i-8] == 1 &&//    0
           this.currentState[i] ==-1   //        _
           && this.currentState[i+8] == 1
         && this.currentState[i+7]!=-1)  //       0
          {
           return currentColumn;
          }

          else if( currentColumn<=3 &&
           this.currentState[i-24] == 1 && //0
           this.currentState[i-16] == 1 &&//    0
           this.currentState[i-8] ==1   //        0
           && this.currentState[i] == -1)  //         _
          {
           return currentColumn;
          }
         }

         var randomColumn = Math.floor(Math.random()*7);
         if(connect4.currentState[randomColumn] != -1)
         {
          for(i=0; i<7; i++)
          {
           if(connect4.currentState[i] == -1)
           {
            return i;
           }
          }

         }
        return randomColumn; // _ _ _ _ _ _ _

}
