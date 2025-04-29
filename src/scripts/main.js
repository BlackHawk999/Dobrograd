$(document).ready(function () {
  var sliderFirst = $(".dobrograd__tasks-slider-row--first");
  var sliderSecond = $(".dobrograd__tasks-slider-row--second");
  var singleSlider = $(".dobrograd__tasks-single-slider");

  sliderFirst.slick({
    arrows: false,
    dots: false,
    variableWidth: true,
    speed: 500,
    asNavFor: sliderSecond,
  });

  sliderSecond.slick({
    speed: 500,
    variableWidth: true,
    asNavFor: sliderFirst,
    dots: false,
  });

  singleSlider.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  });

  var customDotsContainer = $(".custom-dots");

  if (!customDotsContainer.children().length) {
    customDotsContainer.append('<li class="custom-dot" data-group="0"></li>');
    customDotsContainer.append('<li class="custom-dot" data-group="1"></li>');
  }

  $(".custom-dot").on("click", function () {
    var groupIndex = $(this).data("group");
    var slideIndex =
      groupIndex * Math.floor(sliderFirst.slick("getSlick").slideCount / 2);
    sliderFirst.slick("slickGoTo", slideIndex);
  });

  sliderFirst.on("afterChange", function (event, slick, currentSlide) {
    var totalSlides = slick.slideCount;
    var groupIndex = Math.floor(currentSlide / (totalSlides / 2));
    $(".custom-dot").removeClass("active");
    $(".custom-dot[data-group='" + groupIndex + "']").addClass("active");
  });

  $(".custom-dot[data-group='0']").addClass("active");

  $(".prev-btn").click(function () {
    sliderSecond.slick("slickPrev");
  });

  $(".next-btn").click(function () {
    sliderSecond.slick("slickNext");
  });

  $(".prev-btn").addClass("slick-disabled");
  sliderSecond.on("afterChange", function () {
    if ($(".slick-prev").hasClass("slick-disabled")) {
      $(".prev-btn").addClass("slick-disabled");
    } else {
      $(".prev-btn").removeClass("slick-disabled");
    }
    if ($(".slick-next").hasClass("slick-disabled")) {
      $(".next-btn").addClass("slick-disabled");
    } else {
      $(".next-btn").removeClass("slick-disabled");
    }
  });

  // Функция для инициализации слайдера
  function initializeSlider(
    sliderSelector,
    customDotsSelector,
    prevButtonSelector,
    nextButtonSelector
  ) {
    var slider = $(sliderSelector);
    slider.slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
      adaptiveHeight: true,
    });

    // Кастомные точки
    var customDotsContainer = $(customDotsSelector);
    customDotsContainer.append('<li class="custom-dot" data-group="0"></li>');
    customDotsContainer.append('<li class="custom-dot" data-group="1"></li>');

    $(".custom-dot").on("click", function () {
      var groupIndex = $(this).data("group");
      var slideIndex =
        groupIndex * Math.floor(slider.slick("getSlick").slideCount / 2);
      slider.slick("slickGoTo", slideIndex);
    });

    slider.on("afterChange", function (event, slick, currentSlide) {
      var totalSlides = slick.slideCount;
      var groupIndex = Math.floor(currentSlide / (totalSlides / 2));
      $(".custom-dot").removeClass("active");
      $(".custom-dot[data-group='" + groupIndex + "']").addClass("active");
    });

    $(".custom-dot[data-group='0']").addClass("active");

    // Кастомные кнопки
    $(prevButtonSelector).click(function () {
      slider.slick("slickPrev");
    });

    $(nextButtonSelector).click(function () {
      slider.slick("slickNext");
    });

    // Деактивация кастомных кнопок при необходимости
    slider.on("afterChange", function (event, slick, currentSlide) {
      if ($(".slick-prev").hasClass("slick-disabled")) {
        $(prevButtonSelector).addClass("slick-disabled");
      } else {
        $(prevButtonSelector).removeClass("slick-disabled");
      }
      if ($(".slick-next").hasClass("slick-disabled")) {
        $(nextButtonSelector).addClass("slick-disabled");
      } else {
        $(nextButtonSelector).removeClass("slick-disabled");
      }
    });
  }

  // Инициализация первого слайдера (десктоп)
  initializeSlider(
    ".dobrograd__app-page-slider",
    ".custom-dots-desktop",
    ".dobrograd__app-page-prev",
    ".dobrograd__app-page-next"
  );

  // Инициализация второго слайдера (мобильная версия)
  initializeSlider(
    ".dobrograd__app-page-slider-mobile",
    ".custom-dots-mobile",
    ".dobrograd__app-page-prev",
    ".dobrograd__app-page-next"
  );

  initializeSlider(
    ".dobrograd__interview-chat-slider",
    ".custom-dots-interview",
    ".dobrograd__interview-prev",
    ".dobrograd__interview-next"
  );

  var chatMobileSlider = $(".dobrograd__interview-mobile-slider");

  chatMobileSlider.slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    fade: true,
    cssEase: "linear",
    slidesToShow: 1,
    centerMode: true,
  });

  $(".prev-btn").click(function () {
    chatMobileSlider.slick("slickPrev");
  });

  $(".next-btn").click(function () {
    chatMobileSlider.slick("slickNext");
  });

  var billCenterSlider = $(".dobrograd__bills-center-slider");

  billCenterSlider.slick({
    centerMode: true,
    variableWidth: true,
    arrows: false,
    infinite: false,
    centerPadding: "40px",
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
  });

  function animateCards(rowIndex, filterCondition) {
    var wrappers = $(".dobrograd__palette-colors-wrapper");
    const rowList = wrappers.eq(rowIndex).find(".dobrograd__palette-color");
    const filteredList = Array.from(rowList).filter(
      (node) => !node.classList.contains(filterCondition)
    );

    const lastIndex = filteredList.length - 1;
    let index = 0;
    setInterval(() => {
      console.log('filteredList[index] :>> ', filteredList[index]);
      switch (index) {
        case 0:
          filteredList[index].classList.add(
            "dobrograd__palette-color--large"
          );
          filteredList[lastIndex].classList.add(
            "dobrograd__palette-color--thin"
          );
          break;
        case lastIndex:
          filteredList[lastIndex - 1].classList.remove(
            "dobrograd__palette-color--large"
          );
          filteredList[lastIndex].classList.remove(
            "dobrograd__palette-color--thin"
          );
          break;

        default:
          filteredList[index - 1].classList.remove(
            "dobrograd__palette-color--large"
          );
          filteredList[index].classList.add(
            "dobrograd__palette-color--large"
          );
          break;
      }

      if(index === lastIndex) {
        index = -1
      }

      index++
    }, 2000);
  }

  // animateCards(0, "dobrograd__palette-color--mobile");
});
