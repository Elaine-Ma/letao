$(function() {
  var page = 1;
  var pageSize = 5;
  // 渲染+分页
  render();



  function render() {
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        $("tbody").html( template("tpl", info) );



        // 分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:page,
          totalPages: Math.ceil(info.total/info.size),
          size: "small",
          itemTexts: function(type,page,current){
            
          },
          onPageClicked: function(a,b,c,p) {
            page = p;
            render();
          }
        })
      }
    })
  }
})