

// ajax请求
// url 发送地址     data 发送数据   succCallback, errorCallback成功，失败
// type默认post   dataType返回数据类型
function $ajax(url, postData, succCallback, errorCallback, type, dataType){
    var type = type || "post";
    var dataType = dataType || "json";

    $.ajax({
        type: type,
        url: url,
        data: postData,
        dataType: dataType,
        contentType:"Application/JSON; charset=utf-8",
        beforeSend: function(){  //开始loading
            // $(".js_loading").show();                    
        },
        success: function(res){
            succCallback(res);
        },
        error: function(err){
            errorCallback(err);
        },
        complete: function(){   //结束loading
            // $(".js_loading").hide();
        }
    });
}

module.extends = {$ajax};