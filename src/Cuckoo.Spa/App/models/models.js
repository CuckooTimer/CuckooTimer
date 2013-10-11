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
        self.entries = ko.observableArray([]);
        self.currentEntry;
        self.addEntry = function () {
            var entry = new TimeEntryModel();
            self.entries.push(new TimeEntryModel());
            return entry;
        };
        self.removeEntry = function (entry) {
            self.entries.remove(entry);
        };
        self.startNewTimer = function () {
            if (self.currentEntry)
                self.currentEntry.stop();
            self.currentEntry = self.addEntry();
            self.currentEntry.start();
        };
    }

    var TimeEntryModel = function (data) {
        var self = this;
        self.startDate = ko.observable();
        self.endDate = ko.observable();
        self.elapsedSeconds = ko.computed(function () {
            if (!self.startDate()) return 0;
            var end = self.endDate() ? self.endDate() : new Date();
            return (end - self.startDate()) / 1000;
        });
        self.start = function () {
            self.startDate(new Date());
        };
        self.stop = function () {
            self.endDate(new Date());
        };
    }

    return {
        TimerModel: TimerModel,
        TaskModel: TaskModel,
        TimeEntryModel : TimeEntryModel
    };
});