define(['services/logger', 'services/datacontext'], function (logger, datacontext) {
    var tasks = ko.observableArray();
    var today = ko.observable();
    var totalTime = ko.observable();
    var currentTask;
    var initialized = false;
    var getTasks = function () {
        return datacontext.getTasks(tasks);
    };

    var vm = {
        activate: activate,
        title: 'Timer View',
        today: today,
        totalTime: totalTime,
        tasks: tasks,
        toggleTimer: toggleTimer,
        currentTask: currentTask
    };

    initVm();

    return vm;

    //#region Internal Methods
    function activate() {
        var self = this;
        logger.log('Timer View Activated', null, 'timer', true);

        if (initialized) { return; }
        initialized = true;

        return getTasks()
            .then(function () {
                logger.log('Tasks Loaded', null, 'timer', true);
                startTimer();
            });
    }

    function toggleTimer(task) {
        if (!task.Active())
            currentTask = task;
        else
            currentTask = null;
        for (i = 0; i < tasks().length; i++) {
            if (tasks()[i].Id() !== task.Id()) {
                tasks()[i].Active(false);
            }
        }
        task.Active(!task.Active());
    }

    function initVm() {
        vm.today(new Date());
        vm.totalTime(0);
        addHandlers();
        addComputeds();
    }

    function addComputeds() {
        vm.totalDays = ko.computed(function () {
            return Math.floor(vm.totalTime() / 86400);
        });
        vm.totalHours = ko.computed(function () {
            return Math.floor((vm.totalTime() - (vm.totalDays() * 86400)) / 3600);
        });
        vm.totalMinutes = ko.computed(function () {
            return Math.floor((vm.totalTime() - (vm.totalDays() * 86400) - (vm.totalHours() * 3600)) / 60);
        });
        vm.totalSeconds = ko.computed(function () {
            return pad(Math.floor((vm.totalTime() - (vm.totalDays() * 86400) - (vm.totalHours() * 3600) - (vm.totalMinutes() * 60))), 2);
        });
    }

    //function getTasks() {

    //}

    function startTimer() {
        setInterval(function () {
            totalTime(totalTime() + 1);
            if (currentTask != null)
                currentTask.totalTime(currentTask.totalTime() + 1);
        }, 1000);
    }

    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function addHandlers() {
        ko.bindingHandlers.dateString = {
            update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var value = valueAccessor(),
                allBindings = allBindingsAccessor();
                var valueUnwrapped = ko.utils.unwrapObservable(value);
                var pattern = allBindings.datePattern || 'MM/DD/YYYY';
                $(element).text(moment(valueUnwrapped).format(pattern));
            }
        }
    }
    //#endregion
});