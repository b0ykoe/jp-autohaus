function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

$(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoWidth: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fa fa-chevron-left"></i>',
            '<i class="fa fa-chevron-right"></i>'
        ],
        items: 5
    });

    $.scrollify({
        section: ".section",
        sectionName: "section-name",
        interstitialSection: "",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: true,
        setHeights: true,
        overflowScroll: false,
        updateHash: true,
        touchScroll: true,
        before: debounce(function(i, sections) {
            var ref = sections[i].data("section-name");
            $(".nav-link").removeClass("active");
            $(".nav-link[href='#" + ref + "']").addClass("active");
        }),
        afterRender: function() {
            var current = $.scrollify.current();
            var ref = current.data("section-name");
            $(".nav-link").removeClass("active");
            $(".nav-link[href='#" + ref + "']").addClass("active");
        },
        after: debounce(function(i, sections) {
            // Debugging: Log the section index and name after scrolling
            console.log("Scrolled to section:", i, sections[i].data("section-name"));
        })
    });

    let navLinks = document.querySelectorAll("#navbarNav .nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            $.scrollify.move("#" + targetId);
        });
    });

    $('.outer .card').matchHeight();
});