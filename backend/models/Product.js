const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price cannot be negative']
  },
  costPrice: {
    type: Number,
    min: [0, 'Cost price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['mountain', 'road', 'electric', 'bmx', 'hybrid', 'cruiser', 'folding', 'kids', 'accessories', 'parts']
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Product brand is required'],
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: [1900, 'Year must be valid'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'excellent', 'good', 'fair', 'poor'],
    default: 'new'
  },
  size: {
    type: String,
    trim: true
  },
  frameSize: {
    type: String,
    trim: true
  },
  wheelSize: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  colors: [{
    type: String,
    trim: true
  }],
  material: {
    type: String,
    trim: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  videos: [{
    url: String,
    title: String,
    description: String
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  stock: {
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Stock quantity cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    },
    trackInventory: {
      type: Boolean,
      default: true
    }
  },
  availability: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'pre-order', 'discontinued'],
    default: 'in-stock'
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    estimatedDelivery: {
      min: Number, // days
      max: Number  // days
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  seo: {
    title: String,
    description: String,
    keywords: [String],
    slug: {
      type: String,
      unique: true,
      lowercase: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft', 'archived'],
    default: 'active'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    city: String,
    state: String,
    country: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    preferredContact: {
      type: String,
      enum: ['phone', 'email', 'both'],
      default: 'email'
    }
  },
  warranty: {
    type: String,
    trim: true
  },
  returnPolicy: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  soldCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isOnSale
productSchema.virtual('isOnSale').get(function() {
  return this.salePrice && this.salePrice < this.price;
});

// Virtual for discountPercentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.salePrice && this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Virtual for currentPrice
productSchema.virtual('currentPrice').get(function() {
  return this.salePrice || this.price;
});

// Virtual for isLowStock
productSchema.virtual('isLowStock').get(function() {
  return this.stock.quantity <= this.stock.lowStockThreshold;
});

// Virtual for isOutOfStock
productSchema.virtual('isOutOfStock').get(function() {
  return this.stock.quantity === 0;
});

// Virtual for primaryImage
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0] ? this.images[0].url : null);
});

// Indexes
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isTrending: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ status: 1 });
productSchema.index({ seller: 1 });
productSchema.index({ 'location.coordinates': '2dsphere' });

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Pre-save middleware to update availability based on stock
productSchema.pre('save', function(next) {
  if (this.stock.quantity === 0) {
    this.availability = 'out-of-stock';
  } else if (this.stock.quantity <= this.stock.lowStockThreshold) {
    this.availability = 'in-stock';
  }
  next();
});

// Static method to find featured products
productSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ 
    isFeatured: true, 
    status: 'active',
    'stock.quantity': { $gt: 0 }
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('seller', 'username firstName lastName');
};

// Static method to find trending products
productSchema.statics.findTrending = function(limit = 10) {
  return this.find({ 
    isTrending: true, 
    status: 'active',
    'stock.quantity': { $gt: 0 }
  })
  .sort({ viewCount: -1 })
  .limit(limit)
  .populate('seller', 'username firstName lastName');
};

// Static method to find best sellers
productSchema.statics.findBestSellers = function(limit = 10) {
  return this.find({ 
    isBestSeller: true, 
    status: 'active',
    'stock.quantity': { $gt: 0 }
  })
  .sort({ soldCount: -1 })
  .limit(limit)
  .populate('seller', 'username firstName lastName');
};

// Static method to search products
productSchema.statics.search = function(query, options = {}) {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    condition,
    availability,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 20
  } = options;

  const filter = { status: 'active' };

  if (query) {
    filter.$text = { $search: query };
  }

  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (condition) filter.condition = condition;
  if (availability) filter.availability = availability;

  if (minPrice || maxPrice) {
    filter.currentPrice = {};
    if (minPrice) filter.currentPrice.$gte = minPrice;
    if (maxPrice) filter.currentPrice.$lte = maxPrice;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return this.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('seller', 'username firstName lastName');
};

// Instance method to increment view count
productSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to increment favorite count
productSchema.methods.incrementFavoriteCount = function() {
  this.favoriteCount += 1;
  return this.save();
};

// Instance method to decrement favorite count
productSchema.methods.decrementFavoriteCount = function() {
  if (this.favoriteCount > 0) {
    this.favoriteCount -= 1;
  }
  return this.save();
};

// Instance method to update stock
productSchema.methods.updateStock = function(quantity, operation = 'decrease') {
  if (operation === 'decrease') {
    this.stock.quantity = Math.max(0, this.stock.quantity - quantity);
  } else if (operation === 'increase') {
    this.stock.quantity += quantity;
  }
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);
