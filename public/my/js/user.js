$(function () {
  var page = 1,
  pageSize = 10;
  render();

  $('tbody').on('click', '.btn', function () {
    var isDelete;
    var id = $(this).data('id');    
    if ($(this).hasClass('btn-danger')) {
      isDelete = 0;
    }
    if ($(this).hasClass('btn-info')) {
      isDelete = 1;
    }
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        if (info.success) {
          render();
        } else {
          alert('操作失败');
        }
      }
    })
    
  })



  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template('tpl_user', info);
        $('tbody').html(html);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size ),
          onPageChanged: function (a, b, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
})