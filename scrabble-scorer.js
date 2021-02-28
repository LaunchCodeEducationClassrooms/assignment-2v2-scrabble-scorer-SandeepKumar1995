// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   return input.question("Enter a word to score:");
};

let simpleScore=function(word)
{
  word=word.toUpperCase();
  let letterPoints=0;
  for(i=0;i<word.length;i++)
  {
    letterPoints++;
  }
  return letterPoints;
}

let vowelBonusScore=function(word)
{
  word=word.toUpperCase();
  let letterPoints=0;
  for(i=0;i<word.length;i++)
  {
    if(word[i]==='A'  || word[i]==='E' || word[i]==='I' || word[i]==='O' || word[i]==='U')
    {
      letterPoints+=2;
    }
    letterPoints+=1;
  }
  return letterPoints;
}

let scrabbleScore=function(word)
{
  word=word.toLowerCase();
  let score=0;
  for(let i=0;i<word.length;i++)
  {
    score+=newPointStructure[word[i]];
  }
  return score;
};

const scoringAlgorithms = [
  { name: "Simple Score",
    description: "Each letter is worth 1 point",
    scoringFunction: simpleScore
  },
  { name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  },
  { name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  console.log(`Which scoring algorithm would you like to use?\n\n
0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
  let num= input.question("Enter 0, 1, or 2: ");
  while(num !== '0' && num !== '1' && num !== '2')
  {
  num = input.question("invalid input, Enter 0, 1, or 2: ");
  }
  if(num === '0')
  {
    return `Score for '${word}': ${scoringAlgorithms[0].scoringFunction(word)}`;
  }
  else if(num === '1')
  {
    return `Score for '${word}': ${scoringAlgorithms[1].scoringFunction(word)}`;
  }
  else if(num === '2')
  {
    return `Score for '${word}': ${scoringAlgorithms[2].scoringFunction(word)}`;
  }
  else{}
}

function transform(obj) {
let newPointStrucObject={};
for(item in obj)
{
  let newPoint=0;
  while(newPoint<obj[item].length)
  {
    let newKey=obj[item][newPoint];
    newKey=newKey.toLowerCase();
    newPointStrucObject[`${newKey}`] = Number(item);
    newPoint++;
  }
}
return newPointStrucObject;
};

let newPointStructure=transform(oldPointStructure);
newPointStructure[' ']=0;

function runProgram() {
   let word=initialPrompt();
  console.log(scorerPrompt(word));
  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};