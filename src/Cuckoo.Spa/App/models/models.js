define(function (require) {
    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    var TimerModel = function () {
        var self = this;
        self.totalTime = ko.observable(0);

        self.totalDays = ko.computed(function () {
            return Math.floor(self.totalTime() / 86400);
        });
        self.totalHours = ko.computed(function () {
            return Math.floor((self.totalTime() - (self.totalDays() * 86400)) / 3600);
        });
        self.totalMinutes = ko.computed(function () {
            return Math.floor((self.totalTime() - (self.totalDays() * 86400) - (self.totalHours() * 3600)) / 60);
        });
        self.totalSeconds = ko.computed(function () {
            return pad(Math.floor((self.totalTime() - (self.totalDays() * 86400) - (self.totalHours() * 3600) - (self.totalMinutes() * 60))), 2);
        });
    }

    var TaskModel = function (data) {
        var self = this;
        ko.utils.extend(self, new TimerModel());
        ko.mapping.fromJS(data, {}, self);
    }

    return {
        TimerModel: TimerModel,
        TaskModel: TaskModel
    };
});