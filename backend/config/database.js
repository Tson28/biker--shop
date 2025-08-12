import mongoose from 'mongoose';
import config from './config.js';
import logger from '../utils/logger.js';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.database.mongoUri, config.database.options);
    
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      logger.info(chalk.green('🎯 MongoDB connection established successfully'));
    });

    mongoose.connection.on('error', (err) => {
      logger.error(chalk.red('❌ MongoDB connection error:'), err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn(chalk.yellow('⚠️  MongoDB connection disconnected'));
    });

    mongoose.connection.on('reconnected', () => {
      logger.info(chalk.blue('🔄 MongoDB connection reestablished'));
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info(chalk.green('✅ MongoDB connection closed through app termination'));
        process.exit(0);
      } catch (err) {
        logger.error(chalk.red('❌ Error during MongoDB connection closure:'), err);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await mongoose.connection.close();
        logger.info(chalk.green('✅ MongoDB connection closed through app termination'));
        process.exit(0);
      } catch (err) {
        logger.error(chalk.red('❌ Error during MongoDB connection closure:'), err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    logger.error(chalk.red('❌ MongoDB connection failed:'), error);
    process.exit(1);
  }
};

// Database health check
export const checkDatabaseHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return {
      status: state === 1 ? 'healthy' : 'unhealthy',
      state: states[state] || 'unknown',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Database health check failed:', error);
    return {
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Database statistics
export const getDatabaseStats = async () => {
  try {
    const stats = await mongoose.connection.db.stats();
    return {
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Failed to get database stats:', error);
    return null;
  }
};

// Optimize database
export const optimizeDatabase = async () => {
  try {
    logger.info('Starting database optimization...');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (const collection of collections) {
      try {
        // Analyze collection
        await mongoose.connection.db.command({ analyze: collection.name });
        logger.info(`Analyzed collection: ${collection.name}`);
      } catch (err) {
        logger.warn(`Could not analyze collection ${collection.name}:`, err.message);
      }
    }
    
    logger.info('Database optimization completed');
  } catch (error) {
    logger.error('Database optimization failed:', error);
    throw error;
  }
};

export default connectDB;
