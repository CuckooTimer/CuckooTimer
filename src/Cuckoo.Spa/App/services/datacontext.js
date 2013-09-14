define(['services/dataservice'], function (dataservice) {
    "use strict";
    var getTasks = function (results) {
        return dataservice.getTasks()
        .then(function (data) {
            results(data);
        })
    };

    return {
        getTasks: getTasks
    }
});