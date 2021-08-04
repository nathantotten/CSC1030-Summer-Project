let words = ["BOB", "ALICE", "BILL"];

myStorage = window.sessionStorage;

myStorage.setItem('words', JSON.stringify(words));


let unparsedWords = myStorage.getItem('words');
console.log(unparsedWords);
let parsedWords = JSON.parse(unparsedWords);
console.log(parsedWords);

parsedWords.forEach(element => {
    console.log(element);
    document.getElementById("words").innerText += "\n"
    document.getElementById("words").innerText += " " + element + "\n";
});
