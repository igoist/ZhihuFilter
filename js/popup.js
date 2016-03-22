var keywordsDisplay = localStorage.keywords.split(',');
displayKeywords();

// 将所有想屏蔽的关键词放在单独的span里显示出来
function displayKeywords() {
    // 清除已有的 span 元素，防止重复显示。这里不用jQuery怎么写？
    $('#display-keywords').empty();
    keywordsDisplay = localStorage.keywords.split(',');
    for(var i = 0; i < keywordsDisplay.length; i++) {
        var wordSpan = document.createElement('span');
        wordSpan.innerHTML = keywordsDisplay[i];
        wordSpan.className = "item-word";
        // 添加关键词右侧的删除按钮
        var removeButton = document.createElement('a');
        removeButton.className = "remove-button";
        removeButton.onclick = function() {
            removeFromLocalStorage(this.parentNode.firstChild.nodeValue);
        };
        wordSpan.appendChild(removeButton);
        document.getElementById('display-keywords').appendChild(wordSpan);
    }
}

// 在输入框内按下回车会触发按钮单击事件
document.getElementById('new-word').onkeydown = function() {
    if (event.keyCode == 13)
    document.getElementById('save').click();
};

document.getElementById('save').onclick = function(){
    console.log(localStorage.keywords);
    var newWord = document.getElementById('new-word').value;

    if (newWord !== ' ') {  // 这个判断用于防止把空格作为关键字
        if (localStorage.keywords && localStorage.keywords !== '') {
            if (keywordsDisplay.indexOf(newWord) > -1) {
                // 这里判断元素是否已存在
                alert(newWord + "已经存在");
                return;
            }
            localStorage.keywords += (',' + newWord);
        } else {
            localStorage.keywords = newWord;
        }
        displayKeywords();
    }
};

// 从localStorage中删除一个关键词
function removeFromLocalStorage(value) {
    var values = localStorage.keywords.split(',');
    for(var i = 0 ; i < values.length ; i++) {
        if(values[i] === value) {
            values.splice(i, 1);
            localStorage.keywords = values.join(',');
            displayKeywords();
            return;
        }
    }
}

