const Jobs = require('../models/Job')
const mongoose = require('mongoose')

//get all workouts
const getAllJobs = async(req, res) => {
    try{
        const jobs = await Jobs.find({}).sort({cratedAt: -1})
        res.status(200).json(jobs)
    }
    catch(error){
        res.json(400).json({error:error.message})
    }
}

//get job by recency
const getTop10RecentJobs = async(req, res) => {
    try{
        const jobs = await Jobs.find({}).sort({cratedAt: -1}).limit(10);
        console.log(jobs)
       return res.status(200).json(jobs)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}


//get job by numberofbids
const getTop10BiddedJobs = async(req, res) => {
    try{
        const jobs = await Jobs.find({}).sort({numBids: -1}).limit(10);
        console.log(jobs)
       return res.status(200).json(jobs)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}


//create new job
const createJob = async(req, res) => {
    console.log("Here")
    const{title, description, expiry} = req.body
    console.log(expiry)
    try{
        const job = await Jobs.create({title, description, expiry})
        res.status(200).json(job)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }   
}


const bidOnJob = async (req, res) => {
    const { price, userId, _id } = req.body;
    console.log(_id)
    try {
      // Check exists
      const job = await Jobs.findById(_id);
      console.log(job)
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      // Check expiry
      if (job.expiry < new Date()) {
        return res.status(400).json({ error: 'Job has already expired' });
      }
  
      // Update map
      job.bids.set(userId, price);
      job.numBids = job.numBids+1
      await job.save();
  
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// //getBids
// const updateWorkout = async(req,res) => {
//     const{id} = req.params
    
//     if(!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).json({error:"No Such Workout!"})

//     try{
//         const workout = await Workouts.findOneAndUpdate({_id:id},{...req.body})
//         if(!workout)
//             return res.status(400).json({error:"No such workout"});
//         return res.status(200).json(workout)
//     }
//     catch{
//         return res.status(404).json({error:error.message})
//     }
// }



module.exports = {
    getAllJobs,
    getTop10BiddedJobs,
    getTop10RecentJobs,
    createJob,
    bidOnJob
}
