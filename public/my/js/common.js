$(function () {
  $('.aside_dropdown').on('click', function () {
    $(this).next().slideToggle();
  })

  $('.icon_menu').on('click', function () {
    $('body').toggleClass('nopadding');
    $('.lt_aside').toggleClass('conceal');    
  })

  $('.icon_logout').on('click', function () {
    $('#modalLogout').modal('show');    
  })

  $('.btn_logout').on('click', function () {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        } 
      }
    })
  })
})