define(['services/logger', 'services/datacontext', 'models/models'], function (logger, datacontext, models) {
    
    var tasks = ko.observableArray();
    var today = ko.observable(new Date());
    var currentTask;
    var initialized = false;
    var getTasks = function () {
        return datacontext.getTasks(tasks);
    };

    var vm = {
        activate: activate,
        title: 'Timer View',
        today: today,
        tasks: tasks,
        toggleTimer: toggleTimer,
        toggleDetails: toggleDetails,
        onEnter: onEnter,
        addTask: addTask,
        currentTask: currentTask
    };
    ko.utils.extend(vm, new models.TimerModel()); 

    addHandlers();

    return vm;

    //#region Internal Methods
    function activate() {
        var self = this;
        logger.log('Timer View Activated', null, 'timer', true);

        if (initialized) { return; }
        initialized = true;
        //TODO: Show loading message
        return getTasks()
            .then(function () {
                //TODO: Hide loading message
                logger.log('Tasks Loaded', null, 'timer', true);
                startTimer();
            });
    }

    function toggleTimer(task) {
        if (!task.Active()) {
            task.startNewTimer();
            currentTask = task;
        }
        else {
            currentTask.stopTimer();
            currentTask = null;
        }

        for (i = 0; i < tasks().length; i++) {
            if (tasks()[i].Id() !== task.Id()) {
                var t = tasks()[i];
                if (t.Active())
                    t.stopTimer();
            }
        }
    }

    function toggleDetails(data, event) {

        $(event.target).parents(".list-group-item").children(".task-details").toggle();

        var icon = $(event.target).children("span");
        if (!icon.length) icon = $(event.target);
        if (icon.hasClass("glyphicon-chevron-down")) { // show
            icon.removeClass("glyphicon-chevron-down");
            icon.addClass("glyphicon-chevron-up");
        } else { // hide
            icon.removeClass("glyphicon-chevron-up");
            icon.addClass("glyphicon-chevron-down");
        }
    };

    function onEnter(data, event) {
        if (event.keyCode == 13) data.commit();
        return true;
    }

    function addTask() {
        var task = new models.TaskModel({ Id: 0, Name: '', Status: 'New', Tags: [], Description: '', Active: false });
        task.editing(true);
        tasks.push(task);
        return task;
    }

    function startTimer() {
        setInterval(function () {
            if (currentTask != null) {
                vm.totalTime(vm.totalTime() + 1);
                currentTask.totalTime(currentTask.totalTime() + 1);
            }
        }, 1000);
    }

    function addHandlers() {
        ko.bindingHandlers.dateString = {
            update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var value = valueAccessor(),
                allBindings = allBindingsAccessor();
                var valueUnwrapped = ko.utils.unwrapObservable(value);
                var pattern = allBindings.datePattern || 'MM/DD/YYYY';
                if (valueUnwrapped)
                    $(element).text(moment(valueUnwrapped).format(pattern));
                else
                    $(element).text("");
            }
        }
    }
    //#endregion
});