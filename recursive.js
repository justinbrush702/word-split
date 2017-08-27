/**
* Word Split
*
* Given an input string and a dictionary, return a splitting of the string into words in the dictionary
*
* split("helloworld", ["world", "hello"]) -> ["hello", "world"]
* split("hello world", ["world", "hello"]) -> null / empty set
* split("hello world", ["world", "hello", " ", "test"]) -> ["world", "hello", " "]
*
* exact matching
*
**/

// Look at given string, find breakpoints (good words)
// Once I find a breakpoint, recurse. Look at the rest of the substring.
// BASE CASE --> empty string (return true)
// No breakpoint on a word --> return false


var wordSplit = function (input, dictionary) {

  if (input === null || !dictionary) {
    return null;
  }

  var words = findWords(input, dictionary);
  return words;
}

var findWords = function (subInput, dictionary) {



  // BASE CASE
  if (subInput == "") {
    return [];
  } else {
    // Keep track of a cursor
    var index = 0;
    while (index < subInput.length) {
      index++; // advance cursor
      var currWord = subInput.substring(0, index);
      if (isWord(currWord, dictionary)) {
        // console.log(currWord);
        var success = findWords(subInput.substring(index, subInput.length), dictionary);
        // console.log(success);

        if (success != null) {
          success.push(currWord);
          return success;
        }

      }
    }
    return null;
  }


};


var isWord = function (word, dictionary) {
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] == word) {
      return true;
    }
  }
  return false;
}


// var dictionary = ["world", "hello", "hell"];
// var input = "helloworld";

var dictionary = ["I", "hello", "hell", "world", "he"];
var input = "helloworld";

console.log(wordSplit(input, dictionary));
