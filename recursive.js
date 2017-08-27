/**
* Recursive Solution
*
* Look at given string, find breakpoints (good words).
* Once I find a breakpoint, recurse. Look at the rest of the substring.
*
* BASE CASE --> empty string (return an empty list)
* If there is no breakpoint on a word --> return null
*
* NOTE: I reverse the list after receiving it instead of during the back-stepping to decrease runtime.
* The runtime of reversing the list is O(n). The runtime of "unshifting" the list while back-stepping is O(n^2).
**/


// Wrapper function to recursive function
// input --> string to be split
// dictionary --> list of words in the dictionary
var wordSplit = function (input, dictionary) {

  if (input === null || !dictionary) {
    return null;
  }

  var words = findWords(input, dictionary);

  if (!words) {
    return null;
  }

  var reverse = [];
  while (words.length > 0) {
    reverse.push(words.pop());
  }

  return reverse;
}

// Recursive function
// Splits subInput into words until it finds a splitting that works (if a splitting exists)
var findWords = function (subInput, dictionary) {

  // BASE CASE
  if (subInput == "") {
    return [];
  } else {
    // Keep track of a cursor
    var index = 0;

    // While there are more characters to check for splitting
    while (index < subInput.length) {
      index++; // Advance cursor
      var currWord = subInput.substring(0, index);

      if (isWord(currWord, dictionary)) {
        // Recurse down the rest of the input (not including the currWord)
        var success = findWords(subInput.substring(index, subInput.length), dictionary);
        if (success != null) {
          success.push(currWord); // Build list of words as algorithm back-steps
          return success;
        }
      }
    }
    // Hit the end character, but this string is not a word
    return null;
  }
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

var input = "helloworld";
var dictionary = ["I", "hello", "hell", "world", "he"];

console.log(wordSplit(input, dictionary));
