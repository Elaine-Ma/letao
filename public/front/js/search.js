$(function() {



  // 渲染功能
  // 1、获取到localStory中的数据 key的名字It_history
  // 2、准备模板
  function render() {

    // 如果lt_history没有存值 给一个默认值 空的数组 保证得到的数据永远是一个数组
    var result = localStorage.getItem("lt_history") || "[]"; //保证一定能得到一个数组

    result = JSON.parse(result);
    console.log(result);
    // 注意 第二个参数必须是对象 通过对象的属性才能访问到值
    var html = template("tpl", {rows:result});
    $(".lt_history").html(html);
  
  }
  render();
 


  // 一、清空数据的功能
  //  1、给清空数据注册点击事件
  //  2、删除lt_history的数据
  //  3、重新渲染
  $(".lt_history").on("click", ".btn_empty", function() {
    // 删除数据
    localStorage.removeItem("lt_history");
    // 重新渲染
    render();
  });



  // 二、删除数据
  //  1、给上出的x注册点击事件（委托）
  //  2、获取到当前x上的下标
  //  3、湖泊渠道历史记录的数组
  //  4、删除数组对应下标的某一项
  //  5、数组的值已经发生改变 重新存回locaStory
  //  6、重新渲染
  $(".lt_history").on("click",".btn_delete",function() {
    // 获取下标
    var index = $(this).data("index");
    // 获取数组
    var history = getHistory();
    // 删除数组指定下标
    history.splice(index,1);
    localStorage.setItem("lt_history",JSON.stringify(history));
    // 重新渲染
    render();
  });



  // 三、增加功能
  //  1、给搜索按钮注册点击事件
  //  2、获取到输入value
  //  3、获取到历史纪录的数组
  //  4、把value存到数组的最前面
        // 要求1：数组最多存10条记录 如果超过了 会把最早的搜索记录删掉
        // 要求2、如果数组中已经有这个历史记录 要把这个历史记录放到最前面
  //  5、把数组重新存回loca
  //  6、重新渲染
  $(".lt_search button").on("click", function() {
    var txt = $(".lt_search input").val();
    if(txt === "") {
      alert("请输入搜索的内容");
      return;
    }

    // 获取历史数据
    var history = getHistory();
    // 把输入的内容添加到历史记录

    // 如果长度大于等于10 需要把数组的最后一条给删除
    var index = history.indexOf(txt);//获取xtx在数组中的下标

    // 如果数组中已经有了这个记录 把这个记录先删除
    if(index > -1) {
      // 说明存在
      history.splice(index, 1);//删掉
    }

    if(history.length >= 10) {
     history.pop();
    }
    
    history.unshift(txt);
    // 重新存回local
    localStorage.setItem("lt_history",JSON,stringify(history));
    // 重新渲染
    render();
  })
});