'use strict';

angular.module('angular-social-network', [])
  .directive('rcSocialNetworkTwitter', function () {

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
  }).directive('rcSocialNetworkGooglePlus', function () {

    return {
      link: function (scope, element) {

        window.___gcfg = {lang: 'fr'};
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.defer = true;
        po.src = 'https://apis.google.com/js/platform.js';
        po.innerHTML = '{lang: "fr"}';
        var s = element[0];
        s.parentNode.insertBefore(po, s);
      }
    };
  }).directive('rcSocialNetworkPinterest', function () {

    return {
      link: function (scope, element) {
        window.receiveCount = function (data) {
          return data;
        };
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = '//assets.pinterest.com/js/pinit.js';
        po.innerHTML = '{lang: "fr"}';
        var s = element[0];
        s.parentNode.insertBefore(po, s);
      }
    };
  });