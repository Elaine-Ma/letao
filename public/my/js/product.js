$(function () {
  var page = 1;
  var pageSize = 5;
  var tempData = [];
  var $picsShow = $('.img_show');
  var count = 0;


  render();

  //添加按钮弹出模态框
  $('.btn_add').on('click', function () {
    $('#modal_add').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl_drop', info))
      }
    })
  })

  //选择二级分类
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown_text').text($(this).text());
    $('[name="brandId"]').val($(this).data('id'));
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  //上传图片
  $('#upload').on('change', function () {
    var pics = $(this)[0].files;
    console.log(tempData);

    for (var i = 0; i < pics.length; i++) {
      upload();
    }

    function upload() {
      var formData = new FormData();
      formData.append('pic1', pics[i]);
      var xhr = new XMLHttpRequest();
      xhr.open('post', '/product/addProductPic');
      xhr.send(formData);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var result = JSON.parse(xhr.responseText);
          tempData[count] = result;
          $picsShow[count].src = result.picAddr;
          count++;
          if (count >= 3) {
            count = 0;
            $('form').data('bootstrapValidator').updateStatus('pic_validator', 'VALID');
          }
        }
      }
    }
  })

  //表单校验
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d{0,3}$/,
            message: '请输入正确的格式(1-9999)'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          },
          regexp: {
            regexp: /^[3-4][\d][-][3-4][\d]$/,
            message: '请输入正确的格式(30-49)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          },
          regexp: {
            regexp: /^\d+$/,
            message: '请输入正确的格式(纯数字)'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品现价不能为空'
          },
          regexp: {
            regexp: /^\d+$/,
            message: '请输入正确的格式(纯数字)'
          }
        }
      },
      pic_validator: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  //提交信息
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    var data = $('form').serialize();
    data += '&picName1=' + tempData[0].picName + '&picAddr1=' +tempData[0].picAddr;
    data += '&picName2=' + tempData[1].picName + '&picAddr2=' +tempData[1].picAddr;
    data += '&picName2=' + tempData[2].picName + '&picAddr2=' +tempData[2].picAddr;
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: data,
      success: function (info) {
        if (info.success) {
          $('#modal_add').modal('hide');
          $('form').data('bootstrapValidator').resetForm(true);
          $('.dropdown_text').text('请选择二级分类');
          $picsShow.attr('src', "images/none.png");
          render();
        }
      }
    })
  })

  //渲染函数
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tpl_pro', info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageChanged: function (a, b, p) {
            page = p;
            render();
          },
          itemTexts: function (type, page) {
            switch (type) {
              case "first":
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
          tooltipTitles: function () {

          }
        })
      }
    })
  }

})