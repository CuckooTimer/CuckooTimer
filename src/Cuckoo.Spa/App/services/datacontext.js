define(['services/dataservice'], function (dataservice) {
    "use strict";
    var getTasks = function (results) {
        return dataservice.getTasks()
        .then(function (data) {
            var mappedData = ko.mapping.fromJS(data);
            results(mappedData);
        })
    };

    return {
        getTasks: getTasks
    }
});