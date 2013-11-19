define(['services/dataservice','models/models', 'services/logger', 'durandal/system'], function (dataservice, models, logger, system) {
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
            log('Retrieved tasks from remote data source', results, true);
        })
        .fail(function (jqXHR, textStatus) {
            var msg = 'Error getting data. ' + textStatus;
            logger.log(msg, jqXHR, system.getModuleId(datacontext), true);
        });
    };
    var datacontext = {
        getTasks: getTasks
    };
    return datacontext;

    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(datacontext), showToast);
    }
});