/*
  common.js中是所有通过的js功能
*/

// 每个页面一加载就需要发送一个ajax请求 判断当前用户是否登陆
// 如果当前用户没有登录 需要跳转到登录页面
// 如果是login页面 是不用判断有没有登录的

// 如果不是login页面 需要先发送ajax请求 判断用户是否登陆
if(location.href.indexOf("login.html") == -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    success: function(info) {
      if(info.error) {
        location.href = "login.html";
      }
    }
  });  
}

// 配置关闭进度环
// Nprogress.configure({ showSpinner: false});

// 所有的ajax开始的时候 会触发的事件
$(document).ajaxStart(function() {
  NProgress.start();
})

$(document).ajaxStop(function() {
  setTimeout(function () {
    NProgress.done();
  },500);
});



// 二级分类的显示与隐藏
// 1、点击分类管理
// 2、让分类管理下的二级菜单显示或隐藏
$(".child").prev().on("click", function() {
  //
  $(this).next().slideToggle();
});

/*
  点击切换按钮 显示隐藏侧边栏
  1、找到切换按钮
  2、切换
*/
$(".icon_menu").on("click", function() {
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
})


/*
  退出功能
  1、点击退出按钮
  2、显示推出的模态框
  3、点击推出模态框中的确认按钮 退出即可 需要发送ajax请求 告诉服务端 需要退出
*/

$(".icon_logout").on("click", function() {
  // console.log(111);
  $("#logoutModal").modal('show');
});

$(".btn_logout").on("click", function() {
  // 退出
  // 跳出登录页
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    success: function(info) {
      if(info.success) {
        location.href = "login.html";
      }
    }
  });
});



