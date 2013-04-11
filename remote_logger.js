var RemoteLogger = {};

(function(context) {
    var self = context;
    if (!window.console) console = {log: function() {}};
    self.host = window.location.hostname;
    self.useragent = navigator.userAgent;
    self.path = window.location.pathname;

    self.log = function(message) {
        console.log(message);
        var log = {message: message, host: self.host, path: self.path,
                   useragent: self.useragent};
        $.post('http://localhost/phpcorsproxy.php/logger/api/log/create.json',
               {log: log},
               function(data) {
                   // do something once the request returns
                   console.log(data);
               });
    };
})(RemoteLogger);
