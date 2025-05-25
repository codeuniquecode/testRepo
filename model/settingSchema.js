const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  tagline: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  footer: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
