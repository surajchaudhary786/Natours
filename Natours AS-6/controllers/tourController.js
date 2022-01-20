const Tour=require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try{
  const tours = await Tour.find();                               //find metthod return array also convert them to javascript objects

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
} catch(err){
  res.status(404).json({
    status:'fail',
    meaasage: err
  })
}
};

exports.getTour =async (req, res) => {
 try{

  const tour = await Tour.findById(req.params.id);        //   or    //Tour.findOne({_id: req.params.id})

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

 }catch(err){
   res.status(404).json({
     status:'fail',
     message:err
   });
 }
};

exports.createTour = async (req, res) => {
   try{
  // const newTours = new Tour({})
  // newTour.save();
  const newTour=await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
} catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  })
}
};

exports.updateTour =async (req, res) => {
  try {
  const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{            //findbyid and update is mongoose function which will find and update both
    new:true,                                                                  //works only under PATCH request
    runValidators:true
  })  
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
} catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  });
}
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
