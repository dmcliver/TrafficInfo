(function () {

    "use strict";

    var loggingInterceptor = function (realObj, _logger) {

        var self = this;
        var logger = _logger || new Logger();

        self.initialize = function () {

            if (!realObj)
                return null;

            for (var prop in realObj) {
                
                var propName = Object.prototype.toString.call(realObj[prop]);
                if (propName == '[object Function]') {

                    self[prop] = function () {

                        var args = "";

                        try {
                            
                            args = buildArgs(arguments);

                            logger.log("calling method with name: " + prop + args + ", on object with name: " + (getObjectClass(realObj) || "(unable to obtain)"));

                            var methodStrToEvaluate = "realObj." + prop;
                            methodStrToEvaluate += args;
                            
                            eval(methodStrToEvaluate);
                            logger.log("called method with name: " + prop + args + ", on object with name: " + (getObjectClass(realObj) || "(unable to obtain)"));
                        }
                        catch (err) {

                            logger.log("ERROR: " + getObjectClass(realObj) + "::" + prop + args + " method call threw the following exception " + err);
                            throw err;
                        }
                    };
                }
            }

            return self;
        };
    };

    function buildArgs(args) {
        
        var strArgs = "(";

        for (var i = 0; i < args.length; i++) {

            var argument = args[i];

            if (Object.prototype.toString.call(argument) == '[object String]')
                argument = "'" + argument + "'";

            strArgs += argument + ",";
        }

        if (args.length > 0)
            return strArgs.slice(0, strArgs.length - 1) + ")";

        return "()";
    }

    var getObjectClass = function (obj) {

        if (obj && obj.constructor && obj.constructor.toString()) {

            if (obj.constructor.name) 
                return obj.constructor.name;
            
            var str = obj.constructor.toString();

            var arr;
            if (str.charAt(0) == '[') 
                arr = str.match(/\[\w+\s*(\w+)\]/);
             else 
                arr = str.match(/function\s*(\w+)/);
            
            if (arr && arr.length == 2) 
                return arr[1];
        }
        return undefined;
    };

    WinJS.Namespace.define("LoggingInterceptor", {
       Interceptor: loggingInterceptor 
    });
    
})();

