/**
* Optimal Solution (via dynamic programming)
*
* Fill matrix with information regarding input string.
* Fill half of the matrix diagonally, starting from the top left corner to the bottom right corner.
* Then move to the right and fill diagonally again.
* Each position determines whether the substring of the input provided by the coordinates of the position is
* * a word in the dictionary or
* * a concatenation of words in the dictionary.
*
**/

var matrix; // Declare matrix as a global variable

// console.log();

// Creates an "empty" datapoint for input into the matrix
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

// ToString function for easy readability for debugging
var dpToString = function(dp) {
  // return dp.canSplit ? dp.canSplit + "-" + (dp.isCompleteWord ? dp.isCompleteWord : dp.splitPoint) : dp.canSplit
  var output;
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
};


// Main function for solution
var optimal = function (input, dictionary) {

  // Empty string should not return null
  if (input === "") {
    return [];
  }

  // Edge cases
  if (!input || !input.length || input.length <= 0) {
    return null;
  }

  if (!dictionary || !dictionary.length || dictionary.length <= 0) {
    return null;
  }

  // Initialize matrix
  matrix = [];
  for (var i = 0; i < input.length; i++) {
    var row = [];
    for (var j = 0; j < input.length; j++) {
      row.push(createNewDataPoint());
    }
    matrix.push(row);
  }

  // Start looking at the smallest possible words - single characters
  var currLength = 1; // Number of characters we are observing

  while (currLength <= input.length) {
    // Observe the number of "words" in this string that are of the currLength
    // Shift the frame down the string until the end of the frame hits the end of the input
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
          // If currWord can be split somewhere, and the two components originate from successful splittings
          if (!solved && matrix[i][i + j].canSplit && matrix[j + 1][i + currWord.length - 1].canSplit) {
            dp.canSplit = true;
            dp.splitPoint = j; // Keep track of the split point (used for returning list of words)
            solved = true;
          }
        }
      }
      matrix[i][i + currLength - 1] = dp; // Add datapoint to the matrix
    }
    currLength++;
  }

  // printMatrix();

  // If the top right corner can be split, then the input string can be successfully split into words.
  // Return the list of words found.
  if (matrix[0][matrix.length - 1].canSplit === true) {
    return buildList(input);
  } else {
    return null;
  }
};

// Wrapper function to recursive function to extract words from input based on split points
var buildList = function (input) {
  return findWords(0, input.length - 1, input);
};

// Recursive function for finding words based on split points
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

// Used for debugging
var printMatrix = function () {
  for (var i = 0; i < matrix.length; i++) {
    var output = "";
    for (var j = 0; j < matrix.length; j++) {
      output += dpToString(matrix[i][j]) + ", ";
    }
    console.log(output);
  }
  console.log();
};


module.exports.solve = function (input, dictionary) {
  return optimal(input, dictionary);
};
