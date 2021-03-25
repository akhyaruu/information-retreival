# Inverted index IR

Merupakan repository belajar inverted index pada IR (Information Retreival) menggunakan bahasa pemrograman javascript.

## Running & How it works

Untuk dapat menjalankannya pastikan telah terinstall node js di komputer masing-masing. Lalu ketikan perintah berikut untuk melihat hasilnya :

 
```bash
node main.js
```

Penjelasan lebih lengkap dapat dilihat pada [nlp stanford](https://nlp.stanford.edu/IR-book/html/htmledition/a-first-take-at-building-an-inverted-index-1.html)

## Result Example

Dari

```
Doc1

I did enact Julius
Caesar I was killed 
i’ the Capitol; 
Brutus killed me.

Doc2

So let it be with
Caesar. The noble
Brutus hath told you
Caesar was ambitious
```

Menjadi
```
[
  { term: 'ambitious', docId: [ 2 ] },
  { term: 'brutus', docId: [ 1, 2 ] },
  { term: 'caesar', docId: [ 1, 2 ] },
  { term: 'capitol', docId: [ 1 ] },
  { term: 'enact', docId: [ 1 ] },
  { term: 'hath', docId: [ 2 ] },
  { term: 'julius', docId: [ 1 ] },
  { term: 'killed', docId: [ 1 ] },
  { term: 'noble', docId: [ 2 ] },
  { term: 'told', docId: [ 2 ] }
]
```



## License
[MIT](https://choosealicense.com/licenses/mit/) © Original developed by [Ilham Akhyar](https://github.com/akhyaruu)