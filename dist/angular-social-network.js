'use strict';

angular.module('angular-social-network', [])
  .directive('ngSocialNetworkTwitter', function () {

    return {
      link: function (scope) {
        var idScript;
        window.twttr = (function (d, s, id) {
          idScript = id;
          var t, js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js, fjs);
          return window.twttr || (t = {_e: [], ready: function (f) {
            t._e.push(f);
          }});
        }(document, 'script', 'twitter-wjs'));

        scope.$on('$destroy', function () {
          angular.element(document.getElementById(idScript)).remove();
        });
      }
    };
  }).directive('ngSocialNetworkFacebookShare', function ($window) {

    return {
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var fbSharingModeUrl = "http://www.facebook.com/sharer/sharer.php?u=";
          var urlToShare;
          // IF YOU WANT TO SHARE THE CURRENT URL, SET fb-encode-curr-url="true"
          if (attrs.fbEncodeCurrUrl) {
            urlToShare = fbSharingModeUrl + encodeURIComponent($window.location.href);

          // OR IF YOU WANT TO SHARE A SPECIFIC URL, SET fb-url="http://youtUrl"
          }else{
            urlToShare = fbSharingModeUrl + encodeURIComponent(attrs.fbUrl);
          }
          // POPUP SETTINGS
          var w = 600, h = 400;
          var left = (screen.width/2)-(w/2);
          var top = (screen.height/2)-(h/2);
          window.open(urlToShare,'Facebook','menubar=no, scrollbars=no, top='+top+', left='+left+', width='+w+', height='+h+'');

        })
      }
    };
  }).directive('ngSocialNetworkFacebookLike', function () {

    return {
      link: function (scope, element, attrs) {

        // CREATE FB DIV
        var fbElem = document.createElement('div');
        fbElem.id = "fb-root";
        element[0].parentNode.insertBefore(fbElem, element[0]);
        var idScript;

        // FACEBOOK SCRIPT
        (function(d, s, id) {
          idScript = id;
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id))
            return;
          js = d.createElement(s);
          js.id = id;

          // PUT YOUR APPID HERE
          js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId="+attrs.fbAppid+"&version=v2.0";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // ON DESTROY, DELETE FB SCRIPT & DIV
        scope.$on('$destroy', function () {
          angular.element(document.getElementById(idScript)).remove();
          angular.element(fbElem).remove();
        });
      }
    };
  }).directive('ngSocialNetworkGooglePlus', function () {

    return {
      link: function (scope, element, attrs) {
        var lang = 'en';
        if(attrs.lang){
          lang = attrs.lang;
        }
        window.___gcfg = {lang: lang};
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.defer = true;
        po.src = 'https://apis.google.com/js/platform.js';
        po.innerHTML = '{lang: "' + lang + '"}';
        var s = element[0];
        s.parentNode.insertBefore(po, s);
      }
    };
  }).directive('ngSocialNetworkPinterest', function () {

    return {
      link: function (scope, element) {
        window.receiveCount = function (data) {
          return data;
        };
        var d, e, f;
        var pinit = function (a, b, c) {
          d = element[0], e = b.createElement("SCRIPT"), e.type = "text/javascript", e.async = !0, e.src = c, d.parentNode.insertBefore(e, d);
        };
        pinit(window, document, "//assets.pinterest.com/js/pinit_main.js");
        scope.$on('$destroy', function () {
          element.prev().remove();
        });
      }
    };
  });
