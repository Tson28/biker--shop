import winston from 'winston';
import chalk from 'chalk';
import config from '../config/config.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const ts = chalk.gray(timestamp);
    let msg = message;
    
    // Colorize levels
    switch (level) {
      case 'error':
        level = chalk.red(level.toUpperCase());
        break;
      case 'warn':
        level = chalk.yellow(level.toUpperCase());
        break;
      case 'info':
        level = chalk.blue(level.toUpperCase());
        break;
      case 'debug':
        level = chalk.gray(level.toUpperCase());
        break;
      default:
        level = chalk.white(level.toUpperCase());
    }
    
    // Add stack trace for errors
    if (stack) {
      msg += '\n' + chalk.red(stack);
    }
    
    // Add meta information
    if (Object.keys(meta).length > 0) {
      msg += '\n' + chalk.cyan(JSON.stringify(meta, null, 2));
    }
    
    return `${ts} ${level}: ${msg}`;
  })
);

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logs directory if it doesn't exist
import fs from 'fs';
const logsDir = join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define transports
const transports = [];

// Console transport
if (config.logging.console.enabled) {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: config.logging.level
    })
  );
}

// File transports
if (config.logging.file.enabled) {
  // Combined log file
  transports.push(
    new winston.transports.File({
      filename: join(logsDir, 'combined.log'),
      format: fileFormat,
      maxsize: config.logging.file.maxSize,
      maxFiles: config.logging.file.maxFiles,
      level: 'info'
    })
  );
  
  // Error log file
  transports.push(
    new winston.transports.File({
      filename: join(logsDir, 'error.log'),
      format: fileFormat,
      maxsize: config.logging.file.maxSize,
      maxFiles: config.logging.file.maxFiles,
      level: 'error'
    })
  );
  
  // Debug log file (development only)
  if (config.server.nodeEnv === 'development') {
    transports.push(
      new winston.transports.File({
        filename: join(logsDir, 'debug.log'),
        format: fileFormat,
        maxsize: config.logging.file.maxSize,
        maxFiles: config.logging.file.maxFiles,
        level: 'debug'
      })
    );
  }
}

// Create logger instance
const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.metadata()
  ),
  defaultMeta: { service: 'bikerhub-backend' },
  transports,
  exitOnError: false
});

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.File({
    filename: join(logsDir, 'exceptions.log'),
    format: fileFormat
  })
);

logger.rejections.handle(
  new winston.transports.File({
    filename: join(logsDir, 'rejections.log'),
    format: fileFormat
  })
);

// Custom logging methods with additional context
logger.startup = (message, meta = {}) => {
  logger.info(`🚀 ${message}`, { ...meta, context: 'startup' });
};

logger.request = (req, res, responseTime, meta = {}) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode,
    responseTime: `${responseTime}ms`,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    userId: req.user?.id || 'anonymous',
    ...meta,
    context: 'request'
  };
  
  if (res.statusCode >= 400) {
    logger.warn('HTTP Request', logData);
  } else {
    logger.info('HTTP Request', logData);
  }
};

logger.database = (operation, collection, documentId, meta = {}) => {
  logger.debug(`Database ${operation}`, {
    collection,
    documentId,
    ...meta,
    context: 'database'
  });
};

logger.security = (event, user, ip, meta = {}) => {
  logger.warn(`Security Event: ${event}`, {
    user: user?.id || 'anonymous',
    ip,
    ...meta,
    context: 'security'
  });
};

logger.performance = (operation, duration, meta = {}) => {
  const level = duration > 1000 ? 'warn' : 'debug';
  logger[level](`Performance: ${operation} took ${duration}ms`, {
    duration,
    ...meta,
    context: 'performance'
  });
};

logger.business = (event, userId, details, meta = {}) => {
  logger.info(`Business Event: ${event}`, {
    userId,
    details,
    ...meta,
    context: 'business'
  });
};

// Log rotation and cleanup
export const cleanupLogs = async () => {
  try {
    const files = fs.readdirSync(logsDir);
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    
    for (const file of files) {
      const filePath = join(logsDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        fs.unlinkSync(filePath);
        logger.info(`Cleaned up old log file: ${file}`);
      }
    }
  } catch (error) {
    logger.error('Log cleanup failed:', error);
  }
};

// Export logger and cleanup function
export default logger;
