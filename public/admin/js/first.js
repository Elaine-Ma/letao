$(function() {

  var page= 1;
  var pageSize = 8;

  render();

  function render() {
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        $("tbody").html( template("tpl", info) );

        // 初始化分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),
          size: 'smal/',
          onPageClicked: function(a,b,c,p) {
            page = p;
            render();
          }
        });
      }
    });
  }


  // 添加分类功能
  $(".btn_add").on("click", function() {
    $("#addModal").modal('show');
  });


  // 表单校验功能
  $("form").bootstrapValidator({
    // 指定小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 指定校验规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message:'一级分类名称不能为空'
          }
        }
      }
    }
  });

  // 给表单注册校验成功事件success.form.bv
  $("form").on("success.form.bv", function(e) {
    e.preventDefault();

    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $("form").serialize(),
      success: function(info) {
        if(info.success) {
          // 隐藏模态框
          $("#addModal").modal("hide");
          //重新渲染第第一页 因为添加的数据在最前面
          page = 1;
          render();


          // 重置表单内容
          $("form").data("bootstrapValidator").resetForm(true);
        }
      }
    })

  })



})