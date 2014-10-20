(function (css_href,version) {
      "use strict";

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
          var stylesheet = document.createElement('link');
          stylesheet.href = css_href;
          stylesheet.rel = 'stylesheet';
          stylesheet.type = 'text/css';
          document.getElementsByTagName('head')[0].appendChild(stylesheet);

          document.cookie = "font_css_cache";

        } else {
          if (fileIsCached(css_href)) {
            injectRawStyle(localStorage.font_css_cache);
          } else {
            localStorage.clear('font_css_cache');
            localStorage.clear('font_css_cache_file');
            localStorage.clear('font_css_cache_version');

            var xhr = new XMLHttpRequest();
            xhr.open("GET", css_href, true);
            on(xhr, 'load', function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
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

    }('css/fonts.css','1.1'));
