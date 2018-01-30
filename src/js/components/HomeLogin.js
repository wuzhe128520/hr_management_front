
const com = require('../page/common.js');
// 点击切换个人，企业
$('#loginTit .loginTit').on('click',function(e){
    $('#loginTit .loginTit').removeClass('active');
    $(this).addClass('active');
    $("#login .loginCont").css("display","none");
    $($(this).attr('Zid')).css("display","inline-block");
});

// 个人登录
$('#loginOne .login1').on('click',function(){
    console.log("个人登录");

    //  /cfy/user/test.do
    // $.ajax({
    //     url:"/cfy/user/getAllUserInfo.do",
    //     type:"post",
    //     dataType: "json",
    //     contentType: 'application/json',
    // })
    // .done(function(data){
    //     console.log(data);
    // })
    // .fail(function(err){
    //     console.log(err)
    // });
    // console.log(com)
    $ajax(
        '/cfy/user/getAllUserInfo.do', 
        null, 
        function(res){  //成功
            console.log(res)
        },
        function(res){  //失败
            console.log(res)
        }
    );
})



module.exports = {};