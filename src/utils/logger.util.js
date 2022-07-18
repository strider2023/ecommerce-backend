const { createLogger, format, transports } = require('winston');
const { combine, timestamp, logstash } = format;

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        logstash()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}

module.exports = { logger };