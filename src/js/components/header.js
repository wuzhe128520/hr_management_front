


// 切换页首
$('#headTit li').on('click',function(e){
    if(!$(this).hasClass('active')){
        $('#headTit li').removeClass('active');
        $(this).addClass('active');
    }
    
})

module.exrpots = {};