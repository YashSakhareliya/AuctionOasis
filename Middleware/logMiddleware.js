const fs = require('fs');

const logFilePath = 'appLogs/logs.txt';

const appendLogs = (req, res, next) => {
    let logData = `Request Time: ${new Date().toString()} ---- Request Method: ${req.method} ---- Request URL:  ${req.url}  \n`;

    fs.appendFile(logFilePath, logData, (err, data) => {

        if (err) {
            return next(err);
        }
        next()

    })
}

exports.appendLogs = appendLogs;