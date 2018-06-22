//发送ajax请求
$(function () {

  var page = 1;//当前页码
  var pageSize = 8;//每页的数量
  
  // 页面加载 需要重新渲染
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template("tpl", info);
        $("tbody").html(html);


        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定bootstrap的版本
          currentPage: page,//指定当前页
          totalPages: Math.ceil(info.total / info.size),//设置总页数
          size: 'small',//调整分页空间尺寸
          onPageClicked: function (a, b, b, p) { //当点分页的按钮时会触发
            page = p;
            // 重新渲染
            render();
          }
        });
      }
    })
  }


  //启用与禁用功能
  // 需要注册委托事件 因为启用和禁用功能都是动态生成的
  $("tbody").on("click",".btn",function() {
    //显示模态框
    $("#userModal").modal("show");
    var id = $(this).parent().data("id");
    // 取决于点的是启用按钮还是禁用按钮
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    // 注意解除之前的事件绑定
    $(".btn_update").off().on("click", function() {
      // 发送ajax请求
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function(info) {
          if(info.success) {
            // 关闭模态框
            $("#userModal").modal('hide');
            //重新渲染
            render();
          }
        }
      })
    });
  
  });

  

});