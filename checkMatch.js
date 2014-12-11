require('colors');
var jsdiff = require('diff');
var fs = require('fs');

var array1 = fs.readFileSync('solution_output.txt',"utf8");
var array2 = fs.readFileSync('my_solution.txt', "utf8");


var diff = jsdiff.diffChars(array1, array2);

diff.forEach(function(part){
  // green for match, red for deletions, yellow for added
  var color = '';
  if(part.added) color = 'yellow';
  else if(part.removed) color = 'red';
  else color = 'green';
  process.stderr.write(part.value[color]);
});

console.log()