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


textProcessing(data);


function textProcessing(data) {
   // data.map(line => {
   //    tokenize(line);
   // });

   const textResult = [];
   data.map(line => {
      const arrWords = tokenize(line);
      arrWords.map(word => textResult.push(word));
   });
   console.log(textResult);
}


function tokenize(line) {
   const lineLower = line.toLowerCase();
   const regex =  /[^\w\s]/g; 
   const charMatch = lineLower.match(regex);
   let lineReplace = lineLower;
   if (charMatch) {
      charMatch.map(char => {
         lineReplace = lineReplace.replace(char, '');
      });       
   }
   const arrWords = lineReplace.split(' ');
   return prettier(stopwords(arrWords));
}


function stopwords(arrWords) {
   const sourceStopWords = fs.readFileSync('src/stopwords.txt', 'utf-8').toString();
   const stopWords = sourceStopWords.split('\r\n');
   stopWords.map(stopword => {
      arrWords.map(word => {
         if (word == stopword) {
            const index = arrWords.indexOf(word);
            if (index > -1) {
               arrWords.splice(index, 1);
            }
         }  
      })
   });
   return arrWords;
}


function prettier(arrWords) {
   // if (arrWords.length) {
   //    const words = arrWords.filter(word => word.length != 0);
   //    return words;
   // } 
      
   return arrWords.filter(word => word.length != 0).filter(arr => arr);   
}