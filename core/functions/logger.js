import { CLI_COLOURS, LOG_LEVEL } from '../constants/main.js';
import { getCurrentDate, getCurrentHour } from './time.js';

function getColorPerLevel(logLevel) {
    switch (logLevel) {
        case LOG_LEVEL.LOG_ERR:
            return CLI_COLOURS.fg.red;
        case LOG_LEVEL.LOG_INFO:
            return CLI_COLOURS.fg.blue;
        case LOG_LEVEL.LOG_WARN:
            return CLI_COLOURS.fg.yellow
        case LOG_LEVEL.LOG_DEBUG:
            return CLI_COLOURS.fg.green
        default:
            return CLI_COLOURS.fg.white
    }
}

export default function logger(logLevel, msg) {
    if (!Object.values(LOG_LEVEL).includes(logLevel)) {
        console.log(`${logLevel} não incluso nos niveis definidos.`);
        logLevel = LOG_LEVEL.LOG_INFO;
    }
    const date = getCurrentDate();
    const time = getCurrentHour();
    if (typeof msg == "object") {
        msg = JSON.stringify(msg);
    }
    console.log(
        getColorPerLevel(logLevel), 
        `[${date}] - [${time}]: ${logLevel} - ${msg}`,
        CLI_COLOURS.reset
    );
}