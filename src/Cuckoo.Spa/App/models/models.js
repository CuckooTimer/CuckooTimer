define(function (require) {
    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    var TimerModel = function () {
        var self = this;
        self.totalTime = ko.observable(0);
        //self.totalTime.days = ko.computed(function () { return Math.floor(self.totalTime() / 86400); });
        //self.totalTime.hours = ko.computed(function () {
        //    return Math.floor((self.totalTime() - (self.totalDays() * 86400)) / 3600);
        //});
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
        self.cache = function () { };
        ko.utils.extend(self, new TimerModel());
        self.entries = ko.observableArray([]);
        self.currentEntry;

        self.update(data);
               
        self.addEntry = function () {
            var entry = new TimeEntryModel();
            self.entries.push(entry);
            return entry;
        };

        self.removeEntry = function (entry) {
            self.entries.remove(entry);
        };

        self.startNewTimer = function () {
            if (self.currentEntry && self.Active())
                self.currentEntry.stop();
            self.currentEntry = self.addEntry();
            self.currentEntry.start();
            self.Active(true);
        };

        self.stopTimer = function () {
            self.currentEntry.stop();
            self.currentEntry = null;
            self.Active(false);
        };

        self.editing = ko.observable();
        self.startEditing = function () { this.editing(true); }
        self.stopEditing = function () { this.editing(false); }
    }

    TaskModel.prototype.update = function (data) {
        ko.mapping.fromJS(data, {}, this);
        this.cache.latestData = data;
    };
    TaskModel.prototype.revert = function () {
        this.update(this.cache.latestData);
        this.stopEditing();
    };
    TaskModel.prototype.commit = function () {
        this.cache.latestData = ko.toJS(this);
        this.stopEditing();
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