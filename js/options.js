document.getElementById('save').onclick = function(){
    var newWord = ' ' + document.getElementById('new-word').value;
    console.log(document.getElementById('new-word').value);
    if (newWord !== ' ') {  // 这个判断用于防止把空格作为关键字
        localStorage.keywords += newWord;
        document.getElementById('display-keywords').innerHTML = '这里是已保存的关键字：<br>' + localStorage.keywords.toString();
    }
};

document.getElementById('display-keywords').innerHTML = '这里是已保存的关键字：<br>' + localStorage.keywords.toString();
