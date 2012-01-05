(function (home, $, undefined) {
    // private property
    var settings;
    // public property
    home.today = new Date();
    // public method
    home.init = function (options) {
        settings = $.extend({
            debug: true
        }, options);
    }
    // private method
    function isTomorrow(date) {
        return date > home.today;
    }
} (window.home = window.home || {}, jQuery));

$(document).ready(function () {
    home.init();
});