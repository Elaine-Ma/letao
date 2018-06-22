$(function () {
  var $form = $('#form_login');


  $form.bootstrapValidator({
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 3,
            max: 20,
            message: '用户名必须为6-20位'
          },
          callback: {
            message: '用户名不存在'
          }
        } //校验器
      }, //校验username字段
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 16,
            message: '密码必须为6-16位'
          },
          callback: {
            message: '密码错误'
          }
        } //校验器
      } //校验password字段
    }, //设置校验字段
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  }) //初始化校验插件

  var $formVali = $form.data('bootstrapValidator');
  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      success: function (info) {
        if (info.success) {
          location.href = 'index.html';
        }
        switch (info.error) {
          case 1000:
            $formVali.updateStatus('username', 'INVALID', 'callback');
            break;
          case 1001:
            $formVali.updateStatus('password', 'INVALID', 'callback')
            break;
        }

      }
    })
  })
  $('.btn_reset').on('click', function () {
    $formVali.resetForm();
  })



})