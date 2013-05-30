describe("LoggingInterceptor", function() {

    it("should intercept only method calls", function() {

        var logs = [];

        var loggerMock = { log: function (mess) { logs.push(mess); } };

        var objToLog = new FakeObj();

        var loggingInterceptor = new LoggingInterceptor.Interceptor(objToLog, loggerMock);
        var proxy = loggingInterceptor.initialize();

        proxy.callThis("Hello world", 7, true);

        expect(logs.length).toEqual(2);

        expect(objToLog.message).toEqual('Hello world');
        expect(objToLog.ranNum).toEqual(7);
        expect(objToLog.truthOrDare).toEqual(true);

        expect(logs[0]).toEqual('calling method with name: callThis(\'Hello world\',7,true), on object with name: (unable to obtain)');
        expect(logs[1]).toEqual('called method with name: callThis(\'Hello world\',7,true), on object with name: (unable to obtain)');
    });

    it("should log methods properly with zero arguments", function() {

        var logs = [];

        var objToLog = { callThis: function () { } };

        var loggerMock = { log: function (mess) { logs.push(mess); } };

        var loggingInterceptor = new LoggingInterceptor.Interceptor(objToLog, loggerMock);
        var proxy = loggingInterceptor.initialize();

        try {
            proxy.callThis();
        }
        catch (err) { }

        expect(logs[0]).toEqual('calling method with name: callThis(), on object with name: Object');
        expect(logs[1]).toEqual('called method with name: callThis(), on object with name: Object');
    });

    it("should log exceptions", function () {

        var logs = [];

        var objToLog = { callThis: function(a, b, c) { throw new Error('Oops I died'); } };

        var loggerMock = { log: function (mess) { logs.push(mess); } };
        
        var loggingInterceptor = new LoggingInterceptor.Interceptor(objToLog, loggerMock);
        var proxy = loggingInterceptor.initialize();

        try {
            proxy.callThis("Hello world", 7, true);
        }
        catch (err) {}

        expect(logs[0]).toEqual('calling method with name: callThis(\'Hello world\',7,true), on object with name: Object');
        expect(logs[1]).toEqual('ERROR: Object::callThis(\'Hello world\',7,true) method call threw the following exception Error: Oops I died' );
    });

    it("should write a log file", function () {

        var objToLog = new FakeObj();

        var logger = new Logging.Logger();

        var loggingInterceptor = new LoggingInterceptor.Interceptor(objToLog, logger);
        var proxy = loggingInterceptor.initialize();

        proxy.callThis("Hello world", 7, false);
    });

    var FakeObj = function () {

        var self = this;

        this.callThis = function(message, ranNum, truthOrDare) {
                
            self.message = message;
            self.ranNum = ranNum;
            self.truthOrDare = truthOrDare;
        };

        Object.defineProperty(this, "amIGonnaBeCalled", {
            set: function(v) {

            },
            get: function() {
                return "called";
            }
        });
    };
});