/* 
   Tahapan text processing di information retreival 
   dengan inverted index (https://nlp.stanford.edu/IR-book/html/htmledition/a-first-take-at-building-an-inverted-index-1.html)

   1. Collect documents
   2. Tokenization
   3. Normalization
   4. Stemming (linguistic preprocessing)
   5. Stop words
   6. Index the document consisting dictionary and postings

   ###################

   2. Tokenization
      # cut character sequence into words tokens #
      cara baca regex nya (semua karakter yang bukan karakter word atau whitespace)

   3. Normalization
      # map text and query term to same form #
      ex: U.S.A sama seperti USA
      ini gk perlu soalnya di tokenize sudah disederhanakan banget
    
   4. Stemming
      # we may wish different forms of a root to match #
      ex: authorize, authorization
      soon dikerjakan, sekarang gk
      
   5. Stop words
      # We may omit very common words (or not) #
      ex: the, a, to, of, etc 
*/

const fs = require('fs');
const file1 = fs.readFileSync('doc/doc1.txt', 'utf-8').toString();
const file2 = fs.readFileSync('doc/doc2.txt', 'utf-8').toString();


const data1 = file1.split('\r\n');
const data2 = file2.split('\r\n');
const data = data1.concat(data2);

const countData1 = data1.length;


const result = textProcessing(data);
console.log(result);




/* ########################################## Main Function ########################################## */
function textProcessing(data) {
   const tokenWords = [];
   data.map(line => {
      const arrWords = tokenize(line);
      arrWords.map(word => tokenWords.push(word));
   });

   return indexDocument(tokenWords);
}


function tokenize(line) { 
   /* memecah kalimat menjadi token kata */
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
   /* menghilangkan stopwords di bhs. inggris */
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
   /* menghilangkan whitespace dan value yg kosong */
   return arrWords.filter(word => word.length != 0).filter(arr => arr);   
}

function documentCleaning(doc) {
   /* membersihkan dokumen dari karakter agar mudah saat memakai regex untuk menemukan katanya */
   const newDoc = [];
   doc.map(line => {
      const lineLower = line.toLowerCase();
      let lineReplace = lineLower;
      const charMatch = line.match(/[^\w\s]/g);
      if (charMatch) {
         charMatch.map(char => {
            lineReplace = lineReplace.replace(char, '');
         });   
      }
      newDoc.push(lineReplace);
   });

   return newDoc;
}

/*  inspired from https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c  */
function removeDuplicate(arr) {
   [... new Set(arr)];
   arr.filter((item, index) => arr.indexOf(item) === index);
   return arr.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
}

function indexDocument(tokenWords) {
   const newToken = removeDuplicate(tokenWords).sort();
   const dictionaries = [];
   const doc = documentCleaning(data);
   newToken.map(word => {
      const regex = new RegExp("\\b(" + word + ")\\b","g");
      doc.map((line, index) => {
         if (line.match(regex)) {
            if ((index + 1) <= countData1) {
               dictionaries.push({term: word, docId: 1});
            } else {
               dictionaries.push({term: word, docId: 2});
            }
         }
      });
   });

   const result = [];
   dictionaries.map(item => {
      const existing = result.filter(v => v.term == item.term);
      if (existing.length) { 
         if (item.docId != existing[0].docId[existing[0].docId.length - 1]) {
            const existingIndex = result.indexOf(existing[0]);
            result[existingIndex].docId = result[existingIndex].docId.concat(item.docId);
         }    
      } else {
         if (typeof item.docId == 'number') {
            item.docId = [item.docId];
            result.push(item);
         }
      }
   });

   return result;
}