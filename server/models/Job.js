const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employer is required']
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: {
      values: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote'],
      message: 'Job type must be one of: full-time, part-time, contract, freelance, internship, remote'
    }
  },
  workMode: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    default: 'onsite'
  },
  salary: {
    min: {
      type: Number,
      min: [0, 'Minimum salary cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum salary cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  category: {
    type: String,
    required: [true, 'Job category is required'],
    enum: [
      'technology',
      'marketing',
      'sales',
      'finance',
      'healthcare',
      'education',
      'design',
      'engineering',
      'operations',
      'customer-service',
      'human-resources',
      'legal',
      'other'
    ]
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['entry', 'mid', 'senior', 'executive']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  applicationDeadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > Date.now();
      },
      message: 'Application deadline must be in the future'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'expired'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  applicationInstructions: {
    type: String,
    maxlength: [1000, 'Application instructions cannot exceed 1000 characters']
  },
  contactEmail: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid contact email'
    ]
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for applications
jobSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job'
});

// Virtual for days remaining
jobSchema.virtual('daysRemaining').get(function() {
  if (!this.applicationDeadline) return null;
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Virtual for salary range display
jobSchema.virtual('salaryRange').get(function() {
  if (!this.salary.min && !this.salary.max) return 'Not specified';
  if (this.salary.min && this.salary.max) {
    return `${this.salary.currency} ${this.salary.min.toLocaleString()} - ${this.salary.max.toLocaleString()} per ${this.salary.period}`;
  }
  if (this.salary.min) {
    return `${this.salary.currency} ${this.salary.min.toLocaleString()}+ per ${this.salary.period}`;
  }
  return `Up to ${this.salary.currency} ${this.salary.max.toLocaleString()} per ${this.salary.period}`;
});

// Indexes for better query performance
jobSchema.index({ title: 'text', description: 'text', tags: 'text' });
jobSchema.index({ location: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ featured: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ employer: 1 });
jobSchema.index({ company: 1 });
jobSchema.index({ expiresAt: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });

// Compound indexes
jobSchema.index({ category: 1, location: 1 });
jobSchema.index({ status: 1, featured: 1, createdAt: -1 });

// Pre-save middleware to generate slug
jobSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g 
    }) + '-' + this._id.toString().slice(-6);
  }
  next();
});

// Pre-save middleware to set published date
jobSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'active' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Pre-save middleware to handle remote jobs
jobSchema.pre('save', function(next) {
  if (this.jobType === 'remote' || this.workMode === 'remote') {
    this.isRemote = true;
  }
  next();
});

// Static method to get job statistics
jobSchema.statics.getJobStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalJobs: { $sum: 1 },
        activeJobs: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        featuredJobs: {
          $sum: { $cond: ['$featured', 1, 0] }
        },
        avgSalaryMin: { $avg: '$salary.min' },
        avgSalaryMax: { $avg: '$salary.max' }
      }
    }
  ]);
  
  return stats[0] || {
    totalJobs: 0,
    activeJobs: 0,
    featuredJobs: 0,
    avgSalaryMin: 0,
    avgSalaryMax: 0
  };
};

// Static method to get jobs by category
jobSchema.statics.getJobsByCategory = async function() {
  return await this.aggregate([
    { $match: { status: 'active' } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Instance method to increment view count
jobSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to check if job is expired
jobSchema.methods.isExpired = function() {
  return this.expiresAt && this.expiresAt < new Date();
};

// Middleware to automatically set expired status
jobSchema.pre(/^find/, function(next) {
  // Update expired jobs
  this.updateMany(
    { 
      expiresAt: { $lt: new Date() },
      status: { $ne: 'expired' }
    },
    { status: 'expired' }
  );
  next();
});

module.exports = mongoose.model('Job', jobSchema);