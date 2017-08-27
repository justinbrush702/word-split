/**
* Optimal Solution
**/

var list1 = [1,2];
var list2 = [3,4];

var listConcat = list1.concat(list2);

console.log(listConcat);



var createNewDataPoint = function () {
  return {
    // Can the characters in the range of this coordinate be split into words in the dictionary?
    canSplit : false,

    // Do the characters in the range of this coordinate make a word on their own?
    completeWord : false,

    // If the characters in the range of this coordinate can be split,
    // but do not make a word on their own,
    // what is the split point of these characters to produce words in the dictionary?
    splitPoint : null
  };
};



var dpToString = function(dp) {
  return dp.canSplit ? dp.canSplit + "-" + (dp.completeWord ? dp.completeWord : dp.splitPoint) : dp.canSplit
}


var matrix;

var optimal = function (input, dictionary) {

  // Initialize matrix
  matrix = [];
  for (var i = 0; i < input.length; i++) {
    var row = [];
    for (var j = 0; j < input.length; j++) {
      row.push(createNewDataPoint());
    }
    matrix.push(row);
  }

  // Fill matrix with information regarding input string
  for (var i = 0; i < input.length; i++) {
    for (var j = i; j < input.length; j++) {

    }
  }


  var currLength = 1; // length of characters we are





  // If matrix[0][j-1] === true, build the list of words found and return
  // Else, return null



};

// Function to determine whether the given characters are a word in the dictionary
var isWord = function (word, dictionary) {
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] == word) {
      return true;
    }
  }
  return false;
}


var printMatrix = function () {
  for (var i = 0; i < matrix.length; i++) {
    var row = [];
    for (var j = 0; j < matrix.length; j++) {
      row.push(dpToString(matrix[i][j]));
    }
    console.log(row);
  }
}

console.log(optimal("helloworld", ["hello", "world"]));
printMatrix();





// console.log(dpToString(createNewDataPoint()));
