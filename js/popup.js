var keywordsDisplay = localStorage.keywords.split(',');

console.log(keywordsDisplay);

for(var i = 0; i < keywordsDisplay.length; i++) {
    var wordSpan = document.createElement('span');
    wordSpan.innerHTML = keywordsDisplay[i];
    wordSpan.className = "item-word";
    document.getElementById('display-keywords').appendChild(wordSpan);
}

document.getElementById('save').onclick = function(){
    console.log(localStorage.keywords);
    var newWord = document.getElementById('new-word').value;

    if (newWord !== ' ') {  // 这个判断用于防止把空格作为关键字
        if (localStorage.keywords && localStorage.keywords !== '') {
            localStorage.keywords += (',' + newWord);
        } else {
            localStorage.keywords = newWord;
        }
        //document.getElementById('display-keywords').innerHTML = '这里是已保存的关键字：<br>' + localStorage.keywords.toString();
    }
};

