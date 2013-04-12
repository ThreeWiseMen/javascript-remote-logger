var RemoteLogger = {};

(function(context) {
    var self = context;
    if (!window.console) console = {log: function() {}};
    self.host = window.location.hostname;
    self.useragent = navigator.userAgent;
    self.path = window.location.pathname;
    self.token = $.cookie('remote_logger_token') || generate_token();

    var date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000);
    $.cookie('remote_logger_token', self.token, {path: '/', expires: date});

    self.log = function(message) {
        console.log(message);
        var log = {message: message, host: self.host, path: self.path,
                   useragent: self.useragent, token: self.token};
        $.post('http://localhost/phpcorsproxy.php/logger/api/log/create.Jason',
               {log: log},
               function(data) {
                   // do something once the request returns
                   console.log(data);
               });
    };

})(RemoteLogger);

function generate_token() {
    // 10 characters
    // alpha numeric
    var pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var result = "";
    var tmp;
    var number;

    for (var i=0;i < 10; i++) {
        number = Math.floor(Math.random() * (pool.length));
        tmp = pool.substring(number,number + 1);
        result += tmp;
    }

    return result;
};
