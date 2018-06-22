$(function () {
  var page = 1,
    pageSize = 6;

  render();

$('.btn_add').on('click', function () {
  $('#modal_add').modal('show');
})
$('.btn_add_true').on('click', function () {
  var val = $('.category_name').val();
  $.ajax({
    type: 'post',
    url: '/category/addTopCategory',
    data: {
      categoryName: val
    },
    success: function (info) {
      if (info.success) {
        $('#modal_add').modal('hide');
        render();
      }
    }
  })
  
})

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template('tpl_first', info);
        $('tbody').html(html);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageChanged: function (a, b, p) {
            page = p;
            render();
          },
          itemTexts: function(type, page) {
            switch(type) {
              case 'first':
              return '首页';
              case 'last':
              return '尾页';
              case 'prev':
              return '上一页';
              case 'next':
              return '下一页';
              case 'page':
              return page
            }
          },
          tooltipTitles: function() {
            
          }
        })
      }
    })
  }
})