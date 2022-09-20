$(function () {
  var ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
  $(".page").height(ht); //.sc 에다가 윈도우 높이값(ht)을 입력시켜라

  $(window).on("resize", function () {
    //윈도우 사이즈가 조절되거든$(window).resize(function(){}); 같은 의미의 문법이다

    ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
    $(".page").height(ht);
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
  //클릭시
  // const fixed_char_menu = $(".fixed_ex_menu ul li");

  // fixed_char_menu.on("click", function (e) {
  //   e.preventDefault(); //브라우저 구현에 의해 처리되는 기존의 동작을 멈추어라
  //   let idx = fixed_char_menu.index(this);

  //   if (fixed_char_menu.hasClass("on") == true) {
  //     fixed_char_menu.each(function (e) {
  //       $(this).removeClass("on");
  //       fixed_char_menu.eq(idx).addClass("on");
  //     });
  //   } else {
  //     fixed_char_menu.each(function (e) {
  //       fixed_char_menu.eq(idx).addClass("on");
  //     });
  //   }
  // });

  //메뉴의 포커스 설정
  $(window).scroll(function () {
    var sct = $(window).scrollTop(); //스크롤 된 화면의 top의 값을 구하여 sct변수에 기억하라
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
    $(".page").mousewheel(function (event, delta) {
      const body = $("html, body");
      const elem = $(this);
      const upWheel = elem.prev().offset(); //offset() : 특정값의 좌표 (x,y)의 위치값을 찾는다
      const downWheel = elem.next().offset();
      const footer = $(".footer");
      //마우스 휠을 하면~
      if (delta > 0) {
        //마우스 휠을 위쪽으로 드래그 ↑
        if (upWheel) {
          var prev = upWheel.top;
          body.stop().animate(
            {
              scrollTop: prev,
            },
            300
          );

          footer.stop().animate(
            {
              bottom: 0,
            },
            600
          );
        }
      } else if (delta < 0) {
        if (downWheel) {
          var next = downWheel.top;
          body.stop().animate(
            {
              scrollTop: next,
            },
            300
          );
          footer.stop().css("bottom", "-140px");
          footer.stop().animate(
            {
              bottom: 0,
            },
            700
          );
        }
      }
    });
  });
});
