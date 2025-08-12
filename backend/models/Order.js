const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative']
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  shipping: {
    cost: {
      type: Number,
      default: 0,
      min: [0, 'Shipping cost cannot be negative']
    },
    method: {
      type: String,
      enum: ['standard', 'express', 'overnight', 'pickup'],
      default: 'standard'
    },
    estimatedDelivery: {
      type: Date
    },
    trackingNumber: String,
    carrier: String
  },
  discount: {
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    code: String,
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'fixed'
    }
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer', 'cash'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    gateway: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: {
      type: Number,
      default: 0
    }
  },
  billingAddress: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    company: String,
    address: {
      street: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
      zipCode: {
        type: String,
        required: true,
        trim: true
      },
      country: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  shippingAddress: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    company: String,
    address: {
      street: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
      zipCode: {
        type: String,
        required: true,
        trim: true
      },
      country: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  notes: {
    customer: String,
    internal: String
  },
  estimatedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  cancellation: {
    reason: String,
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    requestedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    refundAmount: Number
  },
  refund: {
    reason: String,
    amount: Number,
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    requestedAt: Date,
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    processedAt: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'processed'],
      default: 'pending'
    }
  },
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String,
  tags: [String],
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for order summary
orderSchema.virtual('orderSummary').get(function() {
  return {
    orderNumber: this.orderNumber,
    status: this.status,
    total: this.total,
    itemCount: this.items.length,
    createdAt: this.createdAt
  };
});

// Virtual for isDelivered
orderSchema.virtual('isDelivered').get(function() {
  return this.status === 'delivered';
});

// Virtual for isCancelled
orderSchema.virtual('isCancelled').get(function() {
  return this.status === 'cancelled';
});

// Virtual for isRefunded
orderSchema.virtual('isRefunded').get(function() {
  return this.status === 'refunded';
});

// Virtual for canCancel
orderSchema.virtual('canCancel').get(function() {
  return ['pending', 'confirmed', 'processing'].includes(this.status);
});

// Virtual for canRefund
orderSchema.virtual('canRefund').get(function() {
  return this.status === 'delivered' && !this.isRefunded;
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ 'items.seller': 1 });
orderSchema.index({ 'billingAddress.email': 1 });
orderSchema.index({ 'shippingAddress.email': 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get count of orders for today
    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    
    const todayOrderCount = await this.constructor.countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });
    
    const sequence = String(todayOrderCount + 1).padStart(4, '0');
    this.orderNumber = `BH${year}${month}${day}${sequence}`;
  }
  
  // Add status to history if status changed
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: `Status changed to ${this.status}`
    });
  }
  
  next();
});

// Pre-save middleware to calculate totals
orderSchema.pre('save', function(next) {
  if (this.isModified('items') || this.isModified('discount') || this.isModified('tax') || this.isModified('shipping')) {
    // Calculate subtotal
    this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
    
    // Calculate total
    this.total = this.subtotal + this.tax + this.shipping.cost - this.discount.amount;
    
    // Ensure total is not negative
    if (this.total < 0) {
      this.total = 0;
    }
  }
  next();
});

// Static method to find orders by customer
orderSchema.statics.findByCustomer = function(customerId, options = {}) {
  const { page = 1, limit = 20, status, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  
  const filter = { customer: customerId };
  if (status) filter.status = status;
  
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  return this.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('items.product', 'name images price')
    .populate('items.seller', 'username firstName lastName');
};

// Static method to find orders by seller
orderSchema.statics.findBySeller = function(sellerId, options = {}) {
  const { page = 1, limit = 20, status, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  
  const filter = { 'items.seller': sellerId };
  if (status) filter.status = status;
  
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  return this.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('customer', 'username firstName lastName email')
    .populate('items.product', 'name images price');
};

// Static method to get order statistics
orderSchema.statics.getStatistics = async function(customerId = null) {
  const filter = customerId ? { customer: customerId } : {};
  
  const stats = await this.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$total' },
        averageOrderValue: { $avg: '$total' },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        confirmedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
        },
        deliveredOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  };
};

// Instance method to update status
orderSchema.methods.updateStatus = function(newStatus, note = '', updatedBy = null) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note,
    updatedBy
  });
  return this.save();
};

// Instance method to cancel order
orderSchema.methods.cancelOrder = function(reason, requestedBy) {
  if (!this.canCancel) {
    throw new Error('Order cannot be cancelled in its current status');
  }
  
  this.status = 'cancelled';
  this.cancellation = {
    reason,
    requestedBy,
    requestedAt: new Date()
  };
  
  this.statusHistory.push({
    status: 'cancelled',
    timestamp: new Date(),
    note: `Order cancelled: ${reason}`,
    updatedBy: requestedBy
  });
  
  return this.save();
};

// Instance method to process refund
orderSchema.methods.processRefund = function(amount, reason, processedBy) {
  if (!this.canRefund) {
    throw new Error('Order cannot be refunded in its current status');
  }
  
  this.refund = {
    reason,
    amount,
    requestedBy: this.customer,
    requestedAt: new Date(),
    processedBy,
    processedAt: new Date(),
    status: 'processed'
  };
  
  this.status = 'refunded';
  this.payment.status = 'refunded';
  this.payment.refundedAt = new Date();
  this.payment.refundAmount = amount;
  
  this.statusHistory.push({
    status: 'refunded',
    timestamp: new Date(),
    note: `Refund processed: ${reason}`,
    updatedBy: processedBy
  });
  
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
