/**
* Optimal Solution
**/
console.log();

var list1 = [1,2];
var list2 = [3,4];

var listConcat = list1.concat(list2);

// console.log(listConcat);



var createNewDataPoint = function () {
  return {
    // Can the characters in the range of this coordinate be split into words in the dictionary?
    canSplit : false,

    // Do the characters in the range of this coordinate make a word on their own?
    isCompleteWord : false,

    // If the characters in the range of this coordinate can be split,
    // but do not make a word on their own,
    // what is the split point of these characters to produce words in the dictionary?
    splitPoint : null
  };
};



var dpToString = function(dp) {
  // return dp.canSplit ? dp.canSplit + "-" + (dp.isCompleteWord ? dp.isCompleteWord : dp.splitPoint) : dp.canSplit
  var output = "";
  if (!dp.canSplit) {
    output = "F   ";
  } else {
    if (dp.isCompleteWord) {
      output = "T-T ";
    } else {
      output = "T-" + dp.splitPoint + " ";
    }
  }
  return output;
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


  var currLength = 1; // number of characters we are observing

  while (currLength <= input.length) {
    for (var i = 0; (i + currLength) <= input.length; i++) {
      var currWord = input.substring(i, i + currLength);
      var dp = createNewDataPoint();
      if (isWord(currWord, dictionary)) {
        dp.canSplit = true;
        dp.isCompleteWord = true;
      } else {
        // Loop through range, checking split points
        var solved = false;
        for (j = 0; j < currWord.length; j++) {
          if (!solved && matrix[i][i + j].canSplit && matrix[j + 1][i + currWord.length - 1].canSplit) {
            dp.canSplit = true;
            dp.splitPoint = j;
            solved = true;
          }
        }
      }
      matrix[i][i + currLength - 1] = dp;
    }
    currLength++;
  }

  printMatrix();

  // If matrix[0][j-1] === true, build the list of words found and return
  // Else, return null

  if (matrix[0][matrix.length - 1].canSplit === true) {
    return buildList(input);
    // return 'success';
  } else {
    return null;
  }

};


var buildList = function (input) {
  return findWords(0, input.length - 1, input);
};

var findWords = function (startIndex, endIndex, input) {
  // console.log(startIndex + " " + endIndex);
  var dp = matrix[startIndex][endIndex];
  if (dp.isCompleteWord) {
    return [input.substring(startIndex, endIndex + 1)];
  } else {
    var list1 = findWords(startIndex, dp.splitPoint, input);
    var list2 = findWords(dp.splitPoint + 1, endIndex, input);
    return list1.concat(list2);
  }
};

// Function to determine whether the given characters are a word in the dictionary
var isWord = function (word, dictionary) {
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] === word) {
      return true;
    }
  }
  return false;
}


var printMatrix = function () {
  for (var i = 0; i < matrix.length; i++) {
    // var row = [];
    var output = "";
    for (var j = 0; j < matrix.length; j++) {
      // row.push(dpToString(matrix[i][j]));
      output += dpToString(matrix[i][j]) + ", ";
    }
    // console.log(row);
    console.log(output);
  }
  console.log();
};

// printMatrix();
// console.log(optimal("helloworld", ["hello"]));

console.log(optimal("iamace", ["i", "am", "ace", "a"]));
console.log();

console.log(optimal("helloworld", ["a", "he", "hello", "world"]));
console.log();


// console.log(dpToString(createNewDataPoint()));
