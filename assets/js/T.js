$(function () {
  reSize();
  const contents = $(".page");
  var ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
  contents.height(ht); //contents 에다가 윈도우 높이값(ht)을 입력시켜라
  const fixed_right_menu = $(".fixed_right_menu li"); //스크롤 위치를 표시해줄 애들

  //resize
  function reSize() {
    const contents = $(".page");
    ht = $(window).height(); //변수 ht에 윈도우의 높이값을 기억시켜라
    contents.height(ht);
  }
  //menumove function
  function moveContent(e) {
    const body = $("html, body");
    const elem = $(this);
    e.preventDefault();
    let i = elem.index(); // 메뉴의 일련번호를(0,1,2,3) 구함!
    let nowTop = i * ht; //현재 top의 값이 i*ht가 된다 /이동할 거리값 구하기
    body.stop().animate(
      {
        scrollTop: nowTop,
      },
      1000
    ); //animate({속성:값},시간);
  }
  //scrolled page add,remove classList
  function pageScrollClassOn() {
    const contents = $(".page");
    var sct = $(window).scrollTop(); //스크롤 된 화면의 top의 값을 구하여 sct변수에 기억하라
    var menu = $(".fixed_right_menu li");

    if (sct >= contents.eq(0).offset().top) {
      //offset() 특정 값의 좌표(x,y)값 찾기 /그영역의 top을 구한다
      menu.removeClass("on");
      menu.eq(0).addClass("on");
    }
    if (sct >= contents.eq(1).offset().top) {
      menu.removeClass("on");
      menu.eq(1).addClass("on");
    }
  }
  //onWheel
  function upDownWheel(event) {
    const body = $("html, body");
    const elem = $(this);
    const upWheel = elem.prev().offset(); // 자주 undefined가 됨
    const downWheel = elem.next().offset();
    const footer = $(".footer");

    if (event.originalEvent.deltaY < 0) {
      // 현재 작동하고 있는 이벤트를 가져온다
      if (upWheel) {
        var prev = upWheel.top;
        if (prev > 0) {
          //top이 0인 상황에서 upWheel을 하면 튕겨져 내려가는 현상해결
          body.stop().animate({
            scrollTop: 0,
          });
        } else {
          body.stop().animate(
            {
              scrollTop: prev,
            },
            300
          );
        }
      }
      //down
    } else if (event.originalEvent.deltaY > 0) {
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
  }
  //scroll entire event
  function mouseWheelUpDown() {
    const contents = $(".page");
    pageScrollClassOn();
    contents.bind("wheel", upDownWheel);
  }

  $(window).on("resize load", reSize);
  fixed_right_menu.on("click", moveContent);
  $(window).on("scroll", mouseWheelUpDown);
});
