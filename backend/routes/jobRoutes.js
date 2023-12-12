const express = require('express')

const {
    getAllJobs,
    getTop10BiddedJobs,
    getTop10RecentJobs,
    createJob,
    bidOnJob
} = require('../controllers/jobsController')

const router = express.Router()

//Get all
router.get('/top10Bid', getTop10BiddedJobs)

//GET ID
router.get('/top10Recent', getTop10RecentJobs)

//POST
router.post('/create', createJob)

//POST
router.post('/bidOnJob', bidOnJob)


module.exports = router