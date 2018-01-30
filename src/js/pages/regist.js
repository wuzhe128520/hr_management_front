
require('../../css/lib/bootstrap.min.css');
// require('../../css/lib/bootstrap.min.js');
require('../../css/page/regist.less');


// 点击发送验证码
$("#captcha").on('click',function(){

    // 判断电话号码
    var reg = /^1[3|4|5|8]\d{9}$/;
    if(reg.test(reg.test($(".right [name=phone]").val()))){
        console.log($(".right [name=phone]").val());
        $(this).attr('disabled',true);
        $(".captcha1").css('display','inline');
        var num = 10;
        $("#captcha").text(num+'秒后重新获取激活码');
        var timer = setInterval(()=>{
            num--;
            console.log($("#captcha"))
            $("#captcha").text(num+'秒后重新获取激活码');

            // 可重新获取 
            if(num<1){
                $(this).attr('disabled',false);
                $("#captcha").text('获取验证码');
                clearInterval(timer)
            }
        },1000)
    }else{
        alert("电话号码不正确");
    }
});


// 注册
$("#regForm").on('submit',function(e){
    e.preventDefault();
    var psw = $(".right [name=psw]").val();
    var psw2 = $(".right [name=psw2]").val();
    if(psw!==psw2){
        console.log("密码与确认密码不同");
        return;
    }
    var data = {
        phone:$(".right [name=phone]").val(),
        captcha:$(".right [name=captcha]").val(),
        username:$(".right [name=username]").val(),
        psw:psw
    }
    console.log(data);
})