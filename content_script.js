var keyWords = ["疯狂动物城", "攻壳机动队", "AlphaGo", "papi酱", "Negar"];

var $div = $('<div class="block-info"><p>这里有一个被屏蔽的答案<span></span></p><button class="block-btn">手贱一下</button></div>');
$div.css({
    "backgroundColor" : "#EFF6FA", 
    "height":"64px"
});
console.log($div);

var allContents = $(".feed-main");
for (var i = 0; i < allContents.length; i++) {
    // debugger;
    for (var j = 0; j < keyWords.length; j++) {
        var keyWord = keyWords[j];
        // if (allContents[i].outerHTML.indexOf(keyWord) >= 0) {
        //     $(allContents[i]).addClass('hidden');
        //     $div.clone().insertAfter($(allContents[i]).filter(function() {
        //         return !$(this).siblings('.block-info').length;
        //     }));
        //     continue;
        // }
        if (allContents[i].outerHTML.indexOf(keyWord) >= 0 &&
                $(allContents[i]).siblings('.block-info').length === 0) {
            $(allContents[i]).addClass('hidden');
            // 复制并插入前面创建的div
            var $divClone = $div.clone();
            console.log($divClone);
            $divClone.find('span').text('    【屏蔽的关键词为：' + keyWord + '】');
            $divClone.insertAfter(allContents[i]);

            // 给当前加入的div中的按钮上加入点击事件
            addBtnEvent($(allContents[i]).siblings('.block-info').children('.block-btn'));
            break;
        }       
    }
}
setStyle();

function setStyle() {
    $('.block-btn').css({
        "position" : "absolute",
        "left" : "50%", 
        "top" : "auto",
        "bottom" : "12px",
        "color" : "#fff",
        "opacity" : ".9",
        "backgroundColor" : "#81baeb"
    });
    $('.block-info>p').css({
        "font-size" : "0.9em",
        "padding" : "10px 0 10px 0",
        "text-align" : "center"
    });
}

function addBtnEvent(btn) {
    btn.on('click', function() {
    $(this).parent().siblings('.feed-main').toggleClass('hidden');
    $(this).parent().find('p').toggleClass('hidden');

    // if ($(this).text().indexOf("手贱") >= 0) {
    //     console.log($(this).text());
    //     $(this).text("啊，没防备啊！");
    //     $(this).parent().siblings('.feed-main').removeClass('hidden');
    //     console.log("remove hidden");
    //     $(this).parent().find('p').addClass('hidden');
    // } else {
    //             console.log($(this).text());
    //     $(this).text("再手贱一下");
    //     $(this).parent().siblings('.feed-main').addClass('hidden');
    //     $(this).parent().find('p').removeClass('hidden');
    // }
});
}