define(['durandal/http'], function(http) {
    "use strict";
    var getTasks = function () {
        return http.get('/api/Tasks');
    };

    return {
        getTasks: getTasks,
    }
});