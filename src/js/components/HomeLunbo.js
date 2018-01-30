// 导入依赖包
require('../../css/lib/swiper.min.css');
var Swiper = require('../../css/lib/swiper.min.js');
const jpg = require('../../images/index/swiper1.gif');




// 自写翻页
$('#threeCont span').on('click',function(e){
    console.log($(this).attr('Uid'))
    if($(this).attr('Uid')=='left'){
        $('#threeCont .swiper-button-prev').trigger('click');
    }else{
        $('#threeCont .swiper-button-next').trigger('click');
        $('#threeCont .swiper-wrapper').append($('<div class="swiper-slide" >Slide 6</div>'))
    }
})

// 请求数据回来
var list = [
    {
        title:"广西壮族自治区高级人们法院1",
        img:"../../images/index/swiper1.gif",
        url:"#",
    },
    {
        title:"广西壮族自治区高级人们法院2",
        img:"../images/index/swiper2.jpg",
        url:"#",
    },
    {
        title:"广西壮族自治区高级人们法院3",
        img:"../images/index/swiper3.jpg",
        url:"#",
    },
    {
        title:"广西壮族自治区高级人们法院4",
        img:"../images/index/swiper4.png",
        url:"#",
    },
    {
        title:"广西壮族自治区高级人们法院5",
        img:"../images/index/swiper5.jpg",
        url:"#",
    },
    {
        title:"广西壮族自治区高级人们法院6",
        img:"../images/index/swiper5.jpg",
        url:"#",
    }
];

list.forEach((e,i )=> {
    htmls = '<div class="swiper-slide">'+
                '<a href="'+e.url+'">'+
                '<img src="'+jpg+'">'+
                '<div>'+e.title+'</div>'+
                '</a>'+
                '</div>';
    $('.swiper-wrapper').append($(htmls));

    //创建轮播选项
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

module.exports = {};


