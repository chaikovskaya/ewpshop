/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 770;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
            submitHandler: function(form) {
                if (typeof(ajaxSubmit) == 'function') {
                    ajaxSubmit(form);
                }
            },
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 999 999 99 99',
        "tabThrough": true,
        "showMaskOnHover": false,
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initPopup() {
    $(".js-popup").fancybox({
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
    });
}

function initTextFilterCity() {
    $('.js-textfilter-city').each(function(){
        var $element = $(this),
            $input = $(this).find('.js-textfilter-city-input'),
            classActive = $element.data('textfilter-class') || 'active';

        $input.jcOnPageFilter({
            animateHideNShow: true,
            focusOnLoad: true,
            highlightColor: "transparent",
            textColorForHighlights: "inherit",
            caseSensitive: false,
            hideNegatives: true,
            parentSectionClass: "js-textfilter-city-list",
            parentLookupClass: "js-textfilter-city-parent",
            childBlockClass: "js-textfilter-city-child"
        });

        $input.keyup(function(e) {
            var len = $element.find('.js-textfilter-city-child span').length;
            if (len > 0) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });
    });
}

function initPopupQuestion() {
    jQuery('.js-popup-question').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
            toolbar  : false,
            smallBtn : true,
            btnTpl: {
                smallBtn:
                    '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                    '<svg class="fancybox-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M9.16992 14.8299L14.8299 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M14.8299 14.8299L9.16992 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg>' +
                    '</button>'
            },
            lang: "ru",
            i18n: {
                ru: {
                    CLOSE: "Закрыть",
                },
            },
            afterShow: function (data) {
                initValidate(data.$refs.container.find('.js-form-validate'));
                initForm();
                initMask();
            },
        });
    });
}

function initPopupServices() {
    jQuery('.js-popup-services').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
            toolbar  : false,
            smallBtn : true,
            btnTpl: {
                smallBtn:
                    '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                    '<svg class="fancybox-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M9.16992 14.8299L14.8299 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M14.8299 14.8299L9.16992 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg>' +
                    '</button>'
            },
            lang: "ru",
            i18n: {
                ru: {
                    CLOSE: "Закрыть",
                },
            },
            afterShow: function (data) {
                initValidate(data.$refs.container.find('.js-form-validate'));
                initForm();
                initMask();
            },
        });
    });
}

function initPopupCallback() {
    jQuery('.js-popup-callback').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
            toolbar  : false,
            smallBtn : true,
            btnTpl: {
                smallBtn:
                    '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                    '<svg class="fancybox-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M9.16992 14.8299L14.8299 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M14.8299 14.8299L9.16992 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg>' +
                    '</button>'
            },
            lang: "ru",
            i18n: {
                ru: {
                    CLOSE: "Закрыть",
                },
            },
            afterShow: function (data) {
                initValidate(data.$refs.container.find('.js-form-validate'));
                initForm();
                initMask();
            },
        });
    });
}

function openPopupProfile($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-profile');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initForm();
            initMask();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupProfile() {
    $(".js-open-profile").on('click', function() {
        $.fancybox.close();
        openPopupProfile($(".js-open-profile"));
    });
}

function initClosePopup() {
    $(".js-close-popup").on('click', function() {
        $.fancybox.close();
    });
}

function initQuantity() {
    if (typeof(Quantity) === 'undefined' || !jQuery.isFunction(Quantity)) {
        return false;
    }

    var common = {};

    $('.JS-Quantity').not('.JS-Quantity-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('quantity'));
        new Quantity(this, jQuery.extend({}, common, local));
    });
}

function openPopupBuy($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-buy');
    }

    var url = $element.data('src');
    if ($element.attr('data-id')) url += '?id=' + $element.attr('data-id');
    if ($element.attr('data-quantity')) url += '&quantity=' + $element.attr('data-quantity');

    $.fancybox.open({
        src  :  url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initForm();
            initMask();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupBuy() {
    $(".js-open-buy").on('click', function() {
        $.fancybox.close();
        openPopupBuy($(this));
    });
}

function initPopupBasket() {
    $('.js-popup-basket').each(function() {
        $(this).on('click',function(e) {
            e.preventDefault();
            var url = $(this).data('src');

            $('.js-preloader').removeClass('g-hidden');

            $.ajax({
                url: url,
                type: "get",
                dataType: "html",
                success: function (data) {
                    $('.js-form-popup').html(data);
                    initScroll();
                    initQuantity();
                    initFormatPrice();
                    initSelectCheckbox();
                    initPopupBuy();

                    function initSetDelay() {
                        var local = GLOBAL.parseData(jQuery('.JS-PopupForm').data('popupform'));
                        new MobileMenu('.JS-PopupForm', local)._open();
                    }
                    setTimeout(initSetDelay, 10);

                    $('.js-preloader').addClass('g-hidden');
                },
                error: function(data) {
                }
            });
        });
    });
}

function initPopupWishlist() {
    $('.js-popup-wishlist').each(function() {
        $(this).on('click',function(e) {
            e.preventDefault();
            var url = $(this).data('src');

            $('.js-preloader').removeClass('g-hidden');

            $.ajax({
                url: url,
                type: "get",
                dataType: "html",
                success: function (data) {
                    $('.js-form-popup').html(data);
                    initScroll();
                    initQuantity();
                    initFormatPrice();
                    initSelectCheckbox();
                    initMask();
                    initValidate();

                    function initSetDelay() {
                        var local = GLOBAL.parseData(jQuery('.JS-PopupForm').data('popupform'));
                        new MobileMenu('.JS-PopupForm', local)._open();
                    }
                    setTimeout(initSetDelay, 10);

                    $('.js-preloader').addClass('g-hidden');
                },
                error: function(data) {
                }
            });
        });
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function openPopupSuccess(url) {
    if (typeof(url) == 'undefined') {
        url = '/';
    }

    $.fancybox.open({
        src  : url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initClosePopup();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M9.16992 14.8299L14.8299 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M14.8299 14.8299L9.16992 9.16992" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupSuccess() {
    $(".js-popup-success").on('click', function() {
        openPopupSuccess($(this).data('src'));
    });
}


function initAdaptiveMenu() {
    $('.js-adaptivemenu').each(function() {
        var $navItemMore = $(this).find('.js-adaptivemenu-more'),
            $target = $(this).find('.js-adaptivemenu-target'),
            navItemWidthMore = 0,
            windowWidth = $(this).width(),
            navItemWidth = 0,
            $navItems,
            classActive = $(this).data("adaptivemenu-active");

        if ($(window).width() <= GLOBAL.mobile) {
            $navItems = $(this).find('.js-adaptivemenu-item');
        } else {
            $navItems = $(this).find('.js-adaptivemenu-item');
        }

        if (!$(this).hasClass(classActive)) {
            navItemWidthMore = $navItemMore.innerWidth();
        }

        windowWidth = windowWidth - navItemWidthMore;
        $navItemMore.before($target.find('.js-adaptivemenu-item'));

        $navItems.each(function () {
            navItemWidth += $(this).outerWidth();
        });

        navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();

        while (navItemWidth > windowWidth) {
            navItemWidth -= $navItems.last().width();
            $navItems.last().prependTo($target);
            $navItems.splice(-1, 1);
        }
    });
}

var sliderMainBanner;
function initSliderMainBanner() {
    jQuery('.js-slider-main-banner').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderMainBanner = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 1,
            threshold: 10,
            lazy: true,
            spaceBetween: 0,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                770: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initAccordion() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

function initTextFilterCity() {
    $('.js-textfilter-city').each(function(){
        var $element = $(this),
            $input = $(this).find('.js-textfilter-city-input'),
            classActive = $element.data('textfilter-class') || 'active';

        $input.jcOnPageFilter({
            animateHideNShow: true,
            focusOnLoad: true,
            highlightColor: "transparent",
            textColorForHighlights: "inherit",
            caseSensitive: false,
            hideNegatives: true,
            parentSectionClass: "js-textfilter-city-list",
            parentLookupClass: "js-textfilter-city-parent",
            childBlockClass: "js-textfilter-city-child"
        });

        $input.keyup(function(e) {
            var len = $element.find('.js-textfilter-city-child span').length;
            if (len > 0) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });
    });
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 21,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

function initFormatPrice() {
    $('.js-format-price').each(function(){
        let classActive = 'js-format-price-active';

        if (!$(this).hasClass(classActive)) {
            let str = parseFloat($(this).text()) || "0";

            let strNew = str.toLocaleString();
            $(this).text(strNew);
            $(this).addClass(classActive);
        }
    });
}

function initMainmenu() {
    $('.js-main-menu-item').each(function(){
        let $element = $(this),
            $switcher = $('.js-main-menu-switcher'),
            classActive = $switcher.data('mainmenu-class');

        $element.hover(
            function () {
                $switcher.removeClass(classActive);
            },
            function () {
            }
        );
    });
}

function initNumerator() {
    jQuery('.js-numerator-item').each(function() {
        var $element = $(this),
            $value = $element.find('.js-numerator-value'),
            value = $value.text(),
            max = $element.data('numerator-max'),
            step = $element.data('numerator-step'),
            delay = $element.data('numerator-delay');

        function start() {
            if (value < max){
                value = Number(value) + Number(step);
                $value.html(value);
                setTimeout(start, delay);
            } else {
                if (value > 0){
                    if (value >= 1000000){
                        max = value/1000000;
                    }
                    $value.html(max);
                }
            }
        }
        start();
    });
}

function initShowMore(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initPopupCity() {
    jQuery('.js-popup-city').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
            toolbar  : false,
            smallBtn : true,
            btnTpl: {
                smallBtn:
                    '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                    '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg>' +
                    '</button>'
            },
            lang: "ru",
            i18n: {
                ru: {
                    CLOSE: "Закрыть",
                },
            },
            afterShow: function (data) {
                initScroll();
                initTextFilterCity();
            },
        });
    });
}


function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';

    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
    } else {
        GLOBAL.widthWindow = '';
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
        initAdaptiveMenu();
    });

    initDropdown();
    initScroll();
    initValidate();
    initMask();
    initPopup();
    initPopupCity();
    initPopupQuestion();
    initPopupServices();
    initPopupCallback();
    initPopupProfile();
    initPopupBasket();
    initPopupWishlist();
    initPopupBuy();
    initPopupSuccess();
    initClosePopup();
    initSelect();
    initMobileMenu();
    initForm();
    ymaps.ready(initMap);
    initAdaptiveMenu();
    initSliderMainBanner();
    initAccordion();
    initTextFilterCity();
    initExpand();
    initFormatPrice();
    initMainmenu();
    initQuantity();
    initShowMore();
    ymaps.ready(initMapShops);
});
