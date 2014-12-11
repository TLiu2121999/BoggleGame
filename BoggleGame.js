var myboard = require('./board');
var hashSet = require('./HashSet');
var fs = require('fs');


var my_solution = fs.createWriteStream("my_solution.txt");
var dictSet = new hashSet.HashSet();
var mySolutionSet = new hashSet.HashSet();


//use a hashset to store the dict
var array = fs.readFileSync('dict.txt').toString().split('\n');
for(var i in array){
	array[i] = array[i].substring(0,array[i].length-1);
	dictSet.add(array[i]);
}

var n = myboard.board.length;
var re = [];


//run the main function
generate();
//sort the result array to the alphabetical order
re.sort();

//use another hashmap to store mysolution 
my_solution.once('open', function(fd) {
	for(var i=0; i < re.length; i++){
		if(!mySolutionSet.contains(re[i])){
			my_solution.write(re[i] + "\n");
			mySolutionSet.add(re[i])	
		}
	}
	my_solution.end();
});


function generate(){
	var visited = new Array();

	//2D boolean array, init to be false
	for(var i = 0;i < n; i++){
        visited[i] = new Array();
		for (var j = 0; j < n; j++) {
			visited[i][j] = false;
		}
	}
	
	//traverse all char on the board
	for(var i=0;i<n;i++){
		for (var j = 0; j < n; j++) {
			generate_helper("",i,j,visited);
		}
	}
}

//dfs algorithm 
function generate_helper(tempWord, indexRow, indexCol, visited){
	if(indexRow<0||indexCol<0||indexCol>=n||indexRow>=n||visited[indexRow][indexCol]) return; 
	tempWord+=(myboard.board[indexRow][indexCol]);
    visited[indexRow][indexCol]= true;
    if(tempWord.length >1 ){
    	if(isValidWord(tempWord)){
    		re.push(new String(tempWord));	
    	}
    }	
    generate_helper(tempWord, indexRow+1, indexCol, visited);
    generate_helper(tempWord, indexRow-1, indexCol, visited);
    generate_helper(tempWord, indexRow, indexCol+1, visited);
    generate_helper(tempWord, indexRow, indexCol-1, visited);
    generate_helper(tempWord, indexRow+1, indexCol+1, visited);
    generate_helper(tempWord, indexRow+1, indexCol-1, visited);
    generate_helper(tempWord, indexRow-1, indexCol+1, visited);
    generate_helper(tempWord, indexRow-1, indexCol-1, visited);
    visited[indexRow][indexCol]= false;
}

function isValidWord(word){
	if(dictSet.contains(word)) return true;
	else return false;
}

