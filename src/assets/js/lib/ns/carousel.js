
    NS.moduleCreate('carousel', function($el, param) {
        var wrap = $el.find('ul:first').addClass('carousel-slider'),
            carousel,
            newParam = {},
            $sliders = wrap.find('>').addClass('carousel-slide'),
            $footer = $el.find('footer'),
            $footerLinks = $footer.find('a');

        var paramdef = {
            elements: {
                prevNext: true,
                handles: false,
                counter: false
            },
            templates: {
                'navItemPrev': '<a href="#" class="carousel-nav" role="presentation">' + $el.attr('data-text-prev') + '</a>',
                'navItemNext': '<a href="#" class="carousel-nav" role="presentation">' + $el.attr('data-text-next') + '</a>',
            }
        }

        $.extend(newParam, param, paramdef);

        carousel = new Carousel($el, newParam);
    });
