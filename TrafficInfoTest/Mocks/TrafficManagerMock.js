var TrafficManagerMock = function() {
    "use strict";

    var showCalls = 0;
    var incidentCalls = 0;
    var flowCalls = 0;

    this.show = function() {
        showCalls++;
    };
    
    this.showIncidents = function () {
        incidentCalls++;
    };
    
    this.showFlow = function () {
        flowCalls++;
    };

    this.getCallsOnShow = function() {
        return showCalls;
    };
    
    this.getCallsOnIncidents = function () {
        return incidentCalls;
    };
    
    this.getCallsOnFlow = function () {
        return flowCalls;
    };
}