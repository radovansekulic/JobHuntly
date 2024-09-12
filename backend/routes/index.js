const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const JobController = require('../app/controllers/JobController');
const OfferController = require('../app/controllers/OfferController');
const AuthenticateToken = require('../app/middlewares/AuthenticateToken');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/user', AuthenticateToken, UserController.getUser);
router.post('/create', AuthenticateToken, JobController.createJob);
router.get('/jobs', AuthenticateToken, JobController.getJobs);
router.get('/myJobs/:id', AuthenticateToken, JobController.myJobs);
router.get('/getJob/:id', AuthenticateToken, JobController.getJob);

router.post('/offer/:id', AuthenticateToken, OfferController.createOffer);
router.get('/getOffers/:id', AuthenticateToken, OfferController.getOffers);
router.get('/work/:id', AuthenticateToken, OfferController.getJobs);

module.exports = router;