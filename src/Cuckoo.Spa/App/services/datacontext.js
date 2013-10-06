define(['services/dataservice'], function (dataservice) {
    "use strict";

    var taskMapping = {
        key: function (item) {
            return ko.utils.unwrapObservable(item.Id);
        },
        create: function (options) {
            return new taskModel(options.data);
        }
    };

    var taskModel = function (data) {
        var self = this;
        this.totalTime = ko.observable(0);

        ko.mapping.fromJS(data, {}, this);

        this.totalDays = ko.computed(function () {
            return Math.floor(self.totalTime() / 86400);
        });
        this.totalHours = ko.computed(function () {
            return Math.floor((self.totalTime() - (self.totalDays() * 86400)) / 3600);
        });
        this.totalMinutes = ko.computed(function () {
            return Math.floor((self.totalTime() - (self.totalDays() * 86400) - (self.totalHours() * 3600)) / 60);
        });
        this.totalSeconds = ko.computed(function () {
            return pad(Math.floor((self.totalTime() - (self.totalDays() * 86400) - (self.totalHours() * 3600) - (self.totalMinutes() * 60))), 2);
        });

    }

    var getTasks = function (results) {
        return dataservice.getTasks()
        .then(function (data) {
            ko.mapping.fromJS(data, taskMapping, results);
        })
    };

    return {
        getTasks: getTasks
    }

    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
});