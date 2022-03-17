const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'],
      unique:true,
      trim:true
    },
    duration:{
      type:Number,
      required:[true,'A tour must hace a duration']
    },
    maxGroupSize:{
      type:Number,
      required:[true,'A group size is must']
    },
    difficulty:{
      type:String,
      required:[true,'difficulty must be there']
    },
    ratingsAverage:{
      type:Number,
      default:4.5
    },
    ratingsQuantity:{
      type:Number,
      default:0
    },
    price:{
      type:Number,
      required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
      type:String,
      trim:true
    },
    description:{
      type:String,
      trim:true
    },
    imageCover:{
      type:String,
      required:[true,'A tour have image must']
    },
    images: [String],
    createdAt:{
      type:Date,
      deafult:Date.now()
    },
    startDate: [Date],
  });

  const Tour = mongoose.model('Tour',tourSchema);

  module.exports=Tour;