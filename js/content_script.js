console.log('扩展开始运行……');

// 用于测试的关键字
var testKeywords = ['学web', '培训', '自学', '收入', '如何评价', '神', '最', '段子', '房价', '什么感觉'];
var str = '';
var keywords = [];
var count = 0;  // 记录一下对页面处理了多少次，测试用

// 从扩展的localStorage中获得存储的关键词
chrome.runtime.sendMessage({method: "getKeywords"}, function (response) {
    str = response.keywords;
    keywords = str !== '' ? str.split(',') : [];
    keywords = keywords.concat(testKeywords);
});

// 创建用于替换的div，并设置其样式
var $div = $('<div class="block-info"></div>');
$div.append($('<p>这里有一个被屏蔽的答案<span></span></p>'))
    .append($('<button class="block-btn">手贱一下</button>'))
    .css({
        "backgroundColor" : "#EFF6FA",
        "height":"64px"
});

// keywords是异步获取的，可能运行至此，值还没有传过来，所以用延时来解决
if (keywords.length === 0) {
    setTimeout(function() {
        processPage();
        setStyle();
    }, 1500);
} else {
    processPage();
    setStyle();
}

// 当页面加载更多答案的时候，重新运行处理程序
// 使用MutationObserver来检测页面的变动
var MutationObserver = window.MutationObserver
    || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutationRecords) {
    for (var i = 0; i < mutationRecords.length; i++) {
        var mutation = mutationRecords[i];
        if (mutation.addedNodes.length > 0) {
            var $addNode = $(mutation.addedNodes);
            // 检查新增的节点里是否有 class=feed-main 的元素
            if($addNode.find("div.TopstoryMain").length > 0) {
                // TODO: 这里获得了新增的每一条答案，需要把函数改成对每一条答案单独处理，而不是在一个函数内处理所有的内容
                processPage();
                setStyle();
                return;
            }
        }
    }
});
var observerOption = {
    'childList': true,
    'subtree': true,
    'attributes': false
};
observer.observe($('.TopstoryMain')[0], observerOption);

var extensionOption = getOptions();

/* 主要的处理函数 */
function processPage() {
    // var allContents = $(".Feed"); // feed-item
    var allContents = document.querySelectorAll('.Feed'); // feed-item
    for (var i = 0; i < allContents.length; i++) {
        var outerHTML = allContents[i].outerHTML;
        for (var j = 0; j < keywords.length; j++) {
            var keyword = keywords[j];
            if (!extensionOption.caseSensitive) {   // 不区分大小写
                keyword = keyword.toLowerCase();
                outerHTML = outerHTML.toLowerCase();
            }
            if (keyword !== '') {   // 防止出现所有答案都被屏蔽的情况（可以用其它的方法来避免）
                if (outerHTML.indexOf(keyword) >= 0) { //&& $(allContents[i]).siblings('.block-info').length === 0
                    // $(allContents[i]).addClass('block-hidden');
                    allContents[i].style.display = 'none';
                    // 复制并插入前面创建的div
                    var $divClone = $div.clone();
                    $divClone.find('span').text('    【屏蔽的关键词为：' + keyword + '】');
                    $divClone.insertAfter(allContents[i]);
                    console.log('屏蔽内容：' + $(allContents[i]).find('.ContentItem-title').text());

                    // 给当前加入的div中的按钮上加入点击事件
                    addBtnEvent($(allContents[i]).siblings('.block-info').children('.block-btn'));
                    break;
                }
            }
        }
    }
    count += 1;
    console.log("ZhihuFilter扩展已运行次数：" + count);
}

function setStyle() {
    $('.block-btn').css({
        'position': 'absolute',
        'left': '50%',
        'bottom': '8px',
        'transform': 'translateX(-50%)',
        'border': 'none',
        'border-radius': '3px',
        'padding': '1px 3px',
        'margin-bottom': '3px',
        'font-size': '0.9em',
        'color': '#fff',
        'opacity': '.8',
        'backgroundColor': '#81baeb',
        'cursor': 'pointer'
    });
    $('.block-info>p').css({
        'color': '#333',
        'font-size': '0.9em',
        'padding': '10px 0 10px 0',
        'text-align': 'center'
    });
}

function addBtnEvent(btn) {
    btn.on('click', function() {
        // 改变按钮上的文字及样式
        if ($(this).text().indexOf("手贱") >= 0) {
            $(this).parent().siblings('.Feed')[0].style.display = '';
            $(this).text("啊，没防备啊！");
        } else {
            $(this).parent().siblings('.Feed')[0].style.display = 'none';
            $(this).text("它喵的，瞎了我眼");
        }
    });

    // 鼠标移动到按钮上时改动其样式
    btn.mouseenter(function() {
        $(this).css({"opacity" : "1"});
    }).mouseleave(function() {
        $(this).css({"opacity" : "0.8"});
    });
}

// 获取扩展的设置选项
function getOptions() {
    var options = {
        'caseSensitive': false
    };
    chrome.storage.sync.get({
        caseSensitive: false
    }, function (items) {
        options.caseSensitive = items.caseSensitive;
    });
    return options;
}
