/**
 * Created by asqwrd on 2/28/2016.
 */
var core_1 = require("angular2/core");
var EventService = (function () {
    function EventService() {
        this.emitter = new core_1.EventEmitter();
        this.open = false;
    }
    EventService.prototype.showOverlay = function () {
        return this.open;
    };
    EventService.prototype.broadcast_scroll = function () {
        this.emitter.emit('scroll');
    };
    EventService.prototype.showCompose_broadcast = function (data) {
        this.open = data;
        this.emitter.emit(data);
    };
    return EventService;
})();
exports.EventService = EventService;
