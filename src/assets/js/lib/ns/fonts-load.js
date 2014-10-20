(function (css_href,version,timeout) {
      "use strict";

      var timer;

      function on(el, ev, callback) {
        if (el.addEventListener) {
          el.addEventListener(ev, callback, false);
        } else if (el.attachEvent) {
          el.attachEvent("on" + ev, callback);
        }
      }

      if ((window.localStorage && localStorage.font_css_cache) || document.cookie.indexOf('font_css_cache') > -1){
        injectFontsStylesheet();
      } else {
        on(window, "load", injectFontsStylesheet);
      }

      function fileIsCached(href) {
        return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href) && localStorage.font_css_cache_version === version;
      }

      function injectFontsStylesheet() {
        if (!window.localStorage || !window.XMLHttpRequest) {
          injectLinkCss(css_href);

          document.cookie = "font_css_cache";

        } else {
          if (fileIsCached(css_href)) {
            injectRawStyle(localStorage.font_css_cache);
          } else {
            timer = setTimeout(function(){
              injectLinkCss(css_href);
            },timeout);

            localStorage.clear('font_css_cache');
            localStorage.clear('font_css_cache_file');
            localStorage.clear('font_css_cache_version');

            var xhr = new XMLHttpRequest();
            xhr.open("GET", css_href, true);
            on(xhr, 'load', function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                clearTimeout(timer);
                injectRawStyle(xhr.responseText);

                localStorage.setItem('font_css_cache', xhr.responseText);
                localStorage.setItem('font_css_cache_file', css_href);
                localStorage.setItem('font_css_cache_version', version);
              } else {
                injectLinkCss(css_href);
              }
            });
            xhr.send();
          }
        }
      }

      function injectLinkCss(url){
        var style = document.createElement('link');
            style.setAttribute('href',url);
            style.setAttribute('rel','stylesheet');
            style.setAttribute('type','text/css');
        document.getElementsByTagName('head')[0].appendChild(style);
      }

      function injectRawStyle(text) {
        var css = document.createElement('style'),
            content = document.createTextNode(text);
            css.appendChild(content);

        document.getElementsByTagName('head')[0].appendChild(css);
      }

    }('/css/fontfaces.css','0.1',2000));
