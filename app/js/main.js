$(function () {
  let mobileNavTrigger = $(".menu-btn");
  let mobileNav = $(".header-menu");
  mobileNavTrigger.on("click", function () {
    if (!$(".menu-btn").hasClass("active")) {
      $(".page-bg").addClass("active");
      $(".menu-btn").addClass("active");
      mobileNav.addClass("active");
      $("body").addClass("no-scroll-mobile");
      $(".header").addClass("open-menu");
    } else {
      $(".menu-btn").removeClass("active");
      $(".page-bg").removeClass("active");
      mobileNav.removeClass("active");
      $("body").removeClass("no-scroll-mobile");
      $(".header").removeClass("open-menu");
    }
  });

  let mobileNavParent = $(".mobile-navigation-menu .is-parent > a");
  mobileNavParent.on("click", function (e) {
    e.preventDefault();
    let current = $(this).next(".mobile-navigation-sub-position");
    current.toggleClass("active");
		current.children('.mobile-navigation-sub-menu').slideToggle();
		current.closest('.is-parent').toggleClass('active');
  });

  $(".tags-items .btn-small").on("click", function (e) {
    $(this).toggleClass("active");
  });
  $(".subscription-control-email button").on("click", function (e) {
    $(this).closest('.subscription-wrapper').addClass('fill');
    $('.subscription-message').addClass('active');
  });

  //$.fancybox.defaults.backFocus = false
  $(window).on("scroll", function () {
    var height = $(document).scrollTop().valueOf();
    if (height >= 185) {
      $(".header").addClass("sticky");
    } else {
      $(".header").removeClass("sticky");
    }
  });

  let phoneInputs = $(".add-phone-mask");
  phoneInputs.each(function (index, el) {
    $(this).inputmask({
      mask: "+7 (999) 999 99 99",
      onBeforePaste: function (pastedValue, opts) {
        let clearValue = pastedValue.replace(/\D/g, "");
        if (clearValue.indexOf("89") === 0) {
          return clearValue.replace("89", "+79");
        }
      },
      showMaskOnHover: false,
      clearIncomplete: true,
    });
  });

  phoneInputs.on("keyup", function (event) {
    let value = $(this).inputmask("unmaskedvalue");
    if (value.length === 2) {
      if (value.indexOf("89") === 0 || value.indexOf("79") === 0) {
        $(this).val("9");
      }
    }
  });

  checkTagsHeight();
  $(window).resize(checkTagsHeight);
  $(".tags-all").on("click", function () {
    $(".tags").toggleClass("filled");
  });
});
function checkTagsHeight() {
  let wasOpend = $(".tags").hasClass("filled");
  $(".tags").removeClass("filled");
  let showAllButton =
    $(".tags-items").height() > $(".tags-items-inner").height();
  if (window.matchMedia("(max-width: 1199px)").matches && showAllButton) {
    if (wasOpend) {
      $(".tags").addClass("filled");
    }
    $(".tags-all").addClass("show");
  } else {
    $(".tags-all").removeClass("show");
  }
}
