const winston = require('winston');


const logger = winston.createLogger({
 
level: 'info',
format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'audit.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

function logEvent(tableName: string, operation: string, recordId: string, oldValues: any, newValues: any, changedBy: string) {
  logger.info({
    tableName,
    operation,
    recordId,
    oldValues,
    newValues,
    changedBy,
    timestamp: new Date().toISOString()
  });
}

module.exports = { logger, logEvent };