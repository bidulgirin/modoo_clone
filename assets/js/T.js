$(function () {
  var ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
  $(".page").height(ht); //.sc 에다가 윈도우 높이값(ht)을 입력시켜라

  $(window).on("resize", function () {
    //윈도우 사이즈가 조절되거든$(window).resize(function(){}); 같은 의미의 문법이다

    var ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
    $(".lide").height(ht);
  });

  $(".page").mousemove(function (e) {
    // 마우스 움직일때 이벤트가 일어나 e매개변수안에 xy좌표값이 들어감.

    var posX = e.pageX; // 문서의 왼쪽 가장자리를 기준으로 마우스의 위치 (x좌표 값) 를 posX에 기억시켜라
    var posY = e.pageY; // 문서의 위쪽 가장자리를 기준으로 마우스의 위치 (Y좌표 값) 를 posY에 기억시켜라

    $(".p11").css({ right: 0 - posX / 20, bottom: 0 - posY / 20 });
    $(".p12").css({ right: 0 + posX / 20, bottom: -0 + posY / 20 });
  });

  //메뉴 클릭시 부드럽게 스크롤

  $("#menu li").on("click", function (e) {
    //a를 e매개변수에 기억시킨다
    //$('#menu li').click(function(){}); 와 같은 의미이다
    e.preventDefault(); //브라우저 구현에 의해 처리되는 기존의 동작을 멈추어라
    var i = $(this).index(); // 메뉴의 일련번호를(0,1,2,3) 구함!
    var nowTop = i * ht; //현재 top의 값이 i*ht가 된다 /이동할 거리값 구하기
    $("html, body").stop().animate(
      {
        scrollTop: nowTop,
      },

      1000
    ); //animate({속성:값},시간);
  });

  //메뉴의 포커스 설정
  $(window).scroll(function () {
    var sct = $(window).scrollTop() + 100; //스크롤 된 화면의 top의 값을 구하여 sct변수에 기억하라
    var menu = $("#menu li");
    var contents = $(".page");

    if (sct >= contents.eq(0).offset().top) {
      //offset() 특정 값의 좌표(x,y)값 찾기 /그영역의 top을 구한다
      menu.removeClass("on");
      menu.eq(0).addClass("on");
    }
    if (sct >= contents.eq(1).offset().top) {
      menu.removeClass("on");
      menu.eq(1).addClass("on");
    }
  });

  //마우스 휠움직일때 부드럽게 이동할거에요
  $(window).on("scroll", function () {
    //$(window).scroll(function(){}); 와 같다
    var ht = $(window).height(); //창의 높이 값을 구해라
    var scroll = $(window).scrollTop; //scroll 이라는 함수에게 맨위로 올라가는것을 입력한다

    $(".page").mousewheel(function (event, delta) {
      //한페이지의단위에 마우스 휠을 하면~
      //$('.sc').on("mousewheel",function(){}); 와 같다
      if (delta > 0) {
        //마우스 휠을 위쪽으로 드래그 ↑
        if ($(this).prev().offset()) {
          var prev = $(this).prev().offset().top;
        }

        //offset() 특정값의 좌표 (x,y)의 위치값을 찾는다

        $("html, body").stop().animate(
          {
            scrollTop: prev,
          },
          1000,
          "easeOutBack"
        ); //animate({속성:값},시간);
      } else if (delta < 0) {
        if ($(this).next().offset()) {
          var next = $(this).next().offset().top;
        } //이 if문은 뒤에것이 있는지 물어보기위해서 사용하는 것임 . 있었는데?-> 아뇨 없어요 -> 있ㅇ었는데에? 없어요 당함

        $("html, body").stop().animate(
          {
            scrollTop: next,
          },
          1000,
          "easeOutBack"
        );
        //animate({속성:값},시간);
      }
    });
  });
});
