/* 
   Initial stage of text processing (pakai bhs. inggris)

   1. Tokenization
   2. Normalization
   3. Stemming
   4. Stop words

   ###################

   1. Tokenization
      # cut character sequence into words tokens #
      cara baca regex nya (semua karakter yang bukan karakter word atau whitespace)

   2. Normalization
      # map text and query term to same form #
      ex: U.S.A sama seperti USA
      ini gk perlu soalnya di tokenize sudah disederhanakan banget
    
   3. Stemming
      # we may wish different forms of a root to match #
      ex: authorize, authorization
      soon dikerjakan, sekarang gk
      
   4. Stop words
      # We may omit very common words (or not) #
      ex: the, a, to, of, etc 
*/

const fs = require('fs');
const file1 = fs.readFileSync('doc/doc1.txt', 'utf-8').toString();
const file2 = fs.readFileSync('doc/doc2.txt', 'utf-8').toString();

const tokenArr = [];

const data1 = file1.split('\r\n');
const data2 = file2.split('\r\n');
const data = data1.concat(data2);

data.map(line => {
   // const data = stopwords(tokenize(line));
   // const result = data.split(' ');
   // console.log(stopwords(tokenize(line)));
   console.log(prettier(stopwords(tokenize(line))));
});


function tokenize(line) {
   const lineLower = line.toLowerCase();
   const regex =  /[^\w\s]/g; 
   const charMatch = lineLower.match(regex);
   let lineReplace = lineLower;
   if (charMatch) {
      charMatch.map(char => {
         lineReplace = lineReplace.replace(char, "");
      });       
      return lineReplace;
   } else {
      return lineLower;
   }
}

function stopwords(line) {
   const sourceStopWords = fs.readFileSync('src/stopwords.txt', 'utf-8').toString();
   const stopWords = sourceStopWords.split('\r\n');
   const lineModified = line.split(' ');
   let lineReplace = line;
   lineModified.map(word => {
      stopWords.map(stopword => {
         if (word == stopword) {
            lineReplace = lineReplace.replace(word, "");
         }
      })
   });
   const result = lineReplace.trim();
   return result;
}

function prettier(line) {
   const lineArr = line.split(' ');
   let newLine = '';
   lineArr.map(word => {
      if (word) {
         newLine += `${word} `;
      }
   });
   return newLine;
}


