


const txt = require('../../images/1.txt');
console.log(txt);





 //  点击切换公告
 $('#noticeTitle div').on('click',function(e){
    if(!$(this).hasClass('active')){
        $('#noticeTitle div').removeClass('active');
        $(this).addClass('active');
        $(".noticeList").css("display","none");
        $($(this).attr('Zid')).css("display","inline-block");
    }
});

// 公告
var obj = {
    list1:[
        {
            time:"01-22",
            title:"广东省人力资源市场条例"
        },
        {
            time:"01-21",
            title:"这是由js生成的一句话符合烦烦烦地方都打算大苏打"
        },
        {
            time:"01-20",
            title:"这是由js生成的一句话符合烦烦烦地方都打算大苏打"
        },
        {
            time:"01-12",
            title:"广东省人力资源市场条例"
        },
        {
            time:"01-09",
            title:"广东省人力资源市场条例"
        },
        {
            time:"01-08",
            title:"广东省人力资源市场条例"
        }
    ]
}

// 数据请求回来后
obj.list1.forEach(function(e,i) {
    $("#noticeListOne"). before($('<a href="#"><p>'+e.title+'</p><span>'+e.time+'</span></a>')) 
    if(i==6){
        return;
    }
}, this);
obj.list1.forEach(function(e,i) {
    $("#noticeListTwo"). before($('<a href="#"><p>'+e.title+'</p><span>'+e.time+'</span></a>')) 
    if(i==6){
        return;
    }
}, this);


module.exports = {};