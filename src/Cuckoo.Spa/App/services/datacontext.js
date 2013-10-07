define(['services/dataservice','models/models'], function (dataservice, models) {
    "use strict";

    var taskMapping = {
        key: function (item) {
            return ko.utils.unwrapObservable(item.Id);
        },
        create: function (options) {
            return new models.TaskModel(options.data);
        }
    };

    var getTasks = function (results) {
        return dataservice.getTasks()
        .then(function (data) {
            ko.mapping.fromJS(data, taskMapping, results);
        })
    };

    return {
        getTasks: getTasks
    }
});