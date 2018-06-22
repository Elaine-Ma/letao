$(function () {
  //获取一级分类并渲染，获取第二个一级分类ID并以此渲染内容区
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    success: function (info) {
      $('.nav ul').html(template('tpl_nav', info))
      render(info.rows[1].id)
    }
  })

//注册导航的点击事件
$('.nav ul').on('click', 'li', function () {
  render($(this).data('id'));
  $(this).addClass('active').siblings().removeClass('active');
  
})


//根据一级分类的ID渲染内容区
  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function (info) {
        $('.main ul').html(template('tpl_brand', info));
      }
    })
  }
})