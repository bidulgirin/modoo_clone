(() => {
  const blocks = document.querySelectorAll(".page"),
    block = document.querySelector(".page"),
    sectionHeight = parseInt(window.getComputedStyle(block).height, ""),
    links = document.querySelectorAll(".fixed_right_menu ul li"),
    linksFooter = document.querySelectorAll(".link_footer");

  let inScroll = false, //flag for correct duration step by step
    durationOneScroll = 200, //duration if one step
    arrSections = [],
    step = 0;

  for (let i = 0; i < blocks.length; i++) {
    arrSections.push(sectionHeight * i);
  }

  //one page scroll by mouse wheel
  document.addEventListener("wheel", function (event) {
    if (inScroll === false) {
      inScroll = true;
      //move down
      if (event.deltaY > 0) {
        step >= arrSections.length - 1
          ? (step = arrSections.length - 1)
          : (step = step + 1);
        window.scrollTo({
          top: arrSections[step],
          behavior: "smooth",
        });
        setTimeout(() => {
          inScroll = false;
        }, durationOneScroll);
      } else {
        //move up
        step === 0 ? (step = 0) : (step = step - 1);
        window.scrollTo({
          top: arrSections[step],
          behavior: "smooth",
        });
        setTimeout(() => {
          inScroll = false;
        }, durationOneScroll);
      }
    }
  });

  //scroll to sections by links in header
  for (let j = 0; j < links.length; j++) {
    let link = links[j];
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (inScroll === false) {
        inScroll = true;
        this.classList.add("on");
        window.scrollTo({
          top: arrSections[j],
          behavior: "smooth",
        });
        step = j;
        setTimeout(() => {
          inScroll = false;
        }, durationOneScroll);
      }
    });
  }

  // scroll to sections by links in footer
  for (let j = 0; j < linksFooter.length; j++) {
    let link = linksFooter[j];
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (inScroll === false) {
        inScroll = true;
        window.scrollTo({
          top: arrSections[j],
          behavior: "smooth",
        });
        step = j;
        setTimeout(() => {
          inScroll = false;
        }, durationOneScroll);
      }
    });
  }
})();
