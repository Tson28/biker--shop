import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../../.env') });

const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionSecret: process.env.SESSION_SECRET || 'bikerhub-super-secret-key-2024',
    apiUrl: process.env.API_URL || 'http://localhost:5000',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  },

  database: {
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bikerhub',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false
    }
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
    db: process.env.REDIS_DB || 0,
    keyPrefix: 'bikerhub:'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'bikerhub-jwt-secret-key-2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    issuer: process.env.JWT_ISSUER || 'bikerhub-api',
    audience: process.env.JWT_AUDIENCE || 'bikerhub-users'
  },

  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    },
    from: process.env.EMAIL_FROM || 'noreply@bikerhub.com',
    replyTo: process.env.EMAIL_REPLY_TO || 'support@bikerhub.com'
  },

  payment: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
      currency: process.env.STRIPE_CURRENCY || 'usd'
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
      mode: process.env.PAYPAL_MODE || 'sandbox'
    }
  },

  cloudStorage: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      apiKey: process.env.CLOUDINARY_API_KEY || '',
      apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      folder: process.env.CLOUDINARY_FOLDER || 'bikerhub'
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      region: process.env.AWS_REGION || 'us-east-1',
      bucketName: process.env.AWS_S3_BUCKET || 'bikerhub-uploads'
    }
  },

  fileUpload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    maxFiles: parseInt(process.env.MAX_FILES) || 5,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    uploadDir: join(__dirname, '../uploads'),
    tempDir: join(__dirname, '../temp')
  },

  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    trustProxy: process.env.TRUST_PROXY === 'true'
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: {
      enabled: process.env.LOG_FILE_ENABLED === 'true',
      filename: process.env.LOG_FILE_NAME || 'logs/app.log',
      maxSize: process.env.LOG_FILE_MAX_SIZE || '10m',
      maxFiles: process.env.LOG_FILE_MAX_FILES || '5'
    },
    console: {
      enabled: process.env.LOG_CONSOLE_ENABLED !== 'false',
      colorize: process.env.LOG_CONSOLE_COLORIZE !== 'false'
    }
  },

  analytics: {
    enabled: process.env.ANALYTICS_ENABLED === 'true',
    googleAnalytics: process.env.GOOGLE_ANALYTICS_ID || '',
    mixpanel: process.env.MIXPANEL_TOKEN || '',
    amplitude: process.env.AMPLITUDE_API_KEY || ''
  },

  notifications: {
    email: {
      enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED !== 'false',
      templates: {
        welcome: 'welcome-email',
        orderConfirmation: 'order-confirmation',
        passwordReset: 'password-reset',
        accountVerification: 'account-verification'
      }
    },
    push: {
      enabled: process.env.PUSH_NOTIFICATIONS_ENABLED === 'true',
      vapidPublicKey: process.env.VAPID_PUBLIC_KEY || '',
      vapidPrivateKey: process.env.VAPID_PRIVATE_KEY || ''
    },
    sms: {
      enabled: process.env.SMS_NOTIFICATIONS_ENABLED === 'true',
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
      twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || ''
    }
  },

  cache: {
    enabled: process.env.CACHE_ENABLED !== 'false',
    ttl: parseInt(process.env.CACHE_TTL) || 300, // 5 minutes
    maxKeys: parseInt(process.env.CACHE_MAX_KEYS) || 1000,
    strategy: process.env.CACHE_STRATEGY || 'lru' // lru, fifo, random
  },

  security: {
    cors: {
      allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:8000'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
      maxAge: 86400
    },
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    trustProxy: process.env.TRUST_PROXY === 'true'
  },

  monitoring: {
    enabled: process.env.MONITORING_ENABLED === 'true',
    sentry: {
      dsn: process.env.SENTRY_DSN || '',
      environment: process.env.NODE_ENV || 'development'
    },
    newRelic: {
      licenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
      appName: process.env.NEW_RELIC_APP_NAME || 'BikerHUB Backend'
    }
  }
};

// Validate required configuration
const validateConfig = () => {
  const required = [
    'database.mongoUri',
    'jwt.secret',
    'email.auth.user',
    'email.auth.pass'
  ];

  const missing = required.filter(key => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], config);
    return !value;
  });

  if (missing.length > 0) {
    console.warn('⚠️  Missing required configuration:', missing);
    console.warn('Please check your .env file');
  }
};

// Development configuration overrides
if (config.server.nodeEnv === 'development') {
  config.logging.level = 'debug';
  config.security.rateLimitMaxRequests = 1000;
  config.cache.enabled = false;
}

// Production configuration overrides
if (config.server.nodeEnv === 'production') {
  config.logging.console.enabled = false;
  config.security.trustProxy = true;
  config.monitoring.enabled = true;
}

// Validate configuration on load
validateConfig();

export default config;
