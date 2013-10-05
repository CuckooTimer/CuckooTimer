define(['services/dataservice'], function (dataservice) {
    "use strict";
    var getTasks = function (results) {
        return dataservice.getTasks()
        .then(function (data) {
            ko.mapping.fromJS(data, {}, results);
        })
    };

    return {
        getTasks: getTasks
    }
});