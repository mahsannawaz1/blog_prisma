const { v2: cloudinary } = require('cloudinary')
const cloudinaryConfiguration = require('../config/cloudinary.config')
const fs = require('fs')

module.exports = async (localFilePath) => {
  cloudinaryConfiguration()
  try {
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: 'auto'
      }
    )
    console.log('File uploaded successfully')
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    console.log('Error while uploading file on Cloudinary.')
    fs.unlinkSync(localFilePath)
    return null
  }
}