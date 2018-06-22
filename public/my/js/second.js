$(function () {
  var page = 1,
    pageSize = 8;

  render();

  $('.btn_add').on('click', function () {
    $('#modal_add').modal('show');
  })

  $('#btn_dropdown').on('click', function () {
    var $that = $(this);
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        var html = template('tpl_drop', info);
        $('.dropdown-menu').html(html);
        $that.data('id', info.id);
      }
    })
  })

  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown_text').text($(this).text());
    $('[name="categoryId"]').val($(this).data('id'));
    validator.updateStatus('categoryId', 'VALID')
  })


  $('#upload').on('change', function () {
    var formData = new FormData();
    var img = $('#upload')[0].files[0];
    formData.append('pic1', img);
    var xhr = new XMLHttpRequest;
    xhr.open('post', '/category/addSecondCategoryPic');
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var addr = JSON.parse(xhr.responseText).picAddr;
        $('.img_show').attr('src', addr);
        $('[name="brandLogo"]').val(addr);
    validator.updateStatus('brandLogo', 'VALID')
      }
    }
    // $.ajax({
    //   type: 'post',
    //   url: '/category/addSecondCategoryPic',
    //   data: formData,
    //   processData: false, // 不处理数据  
    //   contentType: false,
    //   success: function (info) {
    //     console.log(info);

    //   }
    // })
  })


  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张图片'
          }
        }
      }

    }
  })

  var validator = $('form').data('bootstrapValidator');


  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
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
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template('tpl_sec', info);
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