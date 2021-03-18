/*
      CONTOH HASIL AKHIRNYA

      [
         {   
            term: "caesar",
            docId: "1"
         },
         {   
            term: "budi",
            docId: ["1","2"]
         }
      ]

      [
         {   
            term: "caesar",
            docFreq: 1,
            docId: "2"
         },
         {   
            term: "budi",
            docFreq: 2,
            docId: ["1","2"]
         }
      ]


*/

const fs = require('fs');
const content1 = fs.readFileSync('doc/doc1.txt', 'utf-8').toString();
const content2 = fs.readFileSync('doc/doc2.txt', 'utf-8').toString();

const tokenArr = [];
const data1 = content1.split('\r\n');
const data2 = content2.split('\r\n');
const data = data1.concat(data2);

data.map(line => {
   console.log(line);
});



function tokenize(data) {

}


// console.log(data1);