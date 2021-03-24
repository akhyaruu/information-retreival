/* 
   Tahapan text processing dengan inverted index (https://nlp.stanford.edu/IR-book/html/htmledition/a-first-take-at-building-an-inverted-index-1.html)

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

const tokenArr = [];

const data1 = file1.split('\r\n');
const data2 = file2.split('\r\n');
const data = data1.concat(data2);

const countData1 = data1.length;
const countData2 = data2.length;
const total = countData1 + countData2;


textProcessing(data);


function textProcessing(data) {

   const tokenWords = [];
   data.map(line => {
      const arrWords = tokenize(line);
      arrWords.map(word => tokenWords.push(word));
   });

   // const kata = 'ilham akhyar firdaus';
   // const dicari = 'firdaus'
   // let re = new RegExp("\\b(" + dicari + ")\\b","g");
   // console.log(kata.match(re));

   const result = indexDocument(tokenWords);


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
   /* membersihkan dokumen dari karakter agar mudah ditemukan pattern nya */
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

/*  dari https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c  */
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

   // console.log(dictionaries);
   const result = [];
   dictionaries.map((dic1, index1) => {
      dictionaries.filter((dic2, index2) => {
         if (index1 == index2) {
            return false;
         }

         if (dic1.term === dic2.term) {
            result.push({term: dic1, docId: [dic1.docId, dic2.docId]});
            return false;
         } else {
            result.push({term: dic1, docId: dic1.docId});
            return false;
         }
      });
   });


   // if (dic1.term === dic2.term) {
   //    result.push({term: dic1, docId: [dic1.docId, dic2.docId]});
   // }
   // console.log(JSON.stringify(result, null, 3));
   console.log(result);
}