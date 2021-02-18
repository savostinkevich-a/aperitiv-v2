require('dotenv').config()

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dftssl8ve',
  api_key: '595214123977648',
  api_secret: 'QDObHeT2t0_m1ektNohgVOHHyaU'
})

module.exports = { cloudinary }