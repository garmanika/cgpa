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

	$('.mobile-navigation-menu-link ').on('click', function (e) {
		$('.mobile-navigation-menu-link span').removeClass('acting');
		$(this).children('span').addClass('acting');

	});


	$(".web-input .check").on("click", function (e) {
		let changeInput = $(this).siblings('input');
		if (changeInput.attr('type') == 'password') {
			changeInput.attr('type', 'text');
		} else {
			changeInput.attr('type', 'password');
		}
		return false;
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

function locationsByTags() {
	let locationItems = $('.location-item');
	let activeTags = $('.tags-item.active');
	if (activeTags.length > 0) {
		locationItems.removeClass('active');
		activeTags.each(function() {
			let tagText = $(this).text();
			$('.location-item .location-item-info-tags .link-simple').each(function() {
				if ($(this).text() === tagText) {
					$(this).closest('.location-item').addClass('active');
				}
			});
		});
	} else {
		locationItems.addClass('active');
	}
}

function locationsSearch(activeLocations) {
	let searchString = $('.tags-search input').val().trim();
	if (searchString.length > 1) {
		activeLocations.removeClass('active');
		let searchItems = activeLocations.filter(function() {
			let reg = new RegExp(searchString, "ig");
			return reg.test($('.location-item-info-title, .location-item-info-descr', this).text());
		});
		if (searchItems.length > 0) {
			searchItems.addClass('active');
		}
	} else {
		activeLocations.addClass('active');
	}
}

function locationsShowActive(showCount) {
	let activeLocations = $('.location-item.active');
	let showMoreTrigger = $('.location-control .btn-tr');
	$('.location-item').removeClass('even');
	$('.location-item:not(.active)').removeClass('active-visible');
	if (activeLocations.length <= showCount) {
		showMoreTrigger.hide();
	} else {
		showMoreTrigger.show();
	}
	activeLocations.each(function(index) {
		if ((index + 1) % 2 === 0) {
			$(this).addClass('even');
		}
		if (index < showCount) {
			$(this).addClass('active-visible');
		} else {
			$(this).removeClass('active-visible');
		}
	});
}
