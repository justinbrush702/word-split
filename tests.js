var recursive = require('./solutions/recursive');
var optimal = require('./solutions/optimal');

// Hardcode solution to run tests against
var solution = optimal;

var areEqual = function (answer, expect) {
  if (answer === null && expect === null) {
    return true;
  }

  if (answer.length !== expect.length) {
    return false;
  }

  for (var i = 0; i < answer.length; i++) {
    if (answer[i] !== expect[i]) {
      return false;
    }
  }

  return true;
};

var resultLine = "=============================================> ";

var testCase = function (input, dictionary, expect) {
  console.log("Input: " + JSON.stringify(input));
  console.log("Dictionary: " + JSON.stringify(dictionary));
  console.log("Expected Answer: " + JSON.stringify(expect));
  console.log(resultLine + (areEqual(solution.solve(input, dictionary), expect) ? 'SUCCESS' : 'FAIL'));
  console.log();
};

console.log();

testCase("helloworld", ["a", "he", "hello", "world"], ["hello", "world"]);
testCase("iamace", ["a", "i", "am", "ace"], ["i", "am", "ace"]);
testCase("iamaceiamace", ["a", "i", "am", "ace"], ["i", "am", "ace", "i", "am", "ace"]);
testCase("iamace", ["a", "I", "am", "ace"], null);
testCase("watchtheworldabc", ["a", "he", "hello", "world"], null);
testCase("", ["a", "he", "hello", "world"], []);
testCase("", [], []);
testCase([], [], null);
testCase(null, null, null);
testCase("canary", [], null);
testCase("canary", {}, null);
testCase({6:7,a:8,list:['a','hello']}, ["a", "he", "hello", "world"], null);
testCase({6:7,a:8,list:['a','hello']}, null, null);
