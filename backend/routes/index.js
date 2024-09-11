const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const JobController = require('../app/controllers/JobController');
const AuthenticateToken = require('../app/middlewares/AuthenticateToken');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user', AuthenticateToken, UserController.getUser);
router.post('/create', AuthenticateToken, JobController.createJob);
router.get('/jobs', AuthenticateToken, JobController.getJobs);
router.get('/myJobs/:id', AuthenticateToken, JobController.myJobs);

module.exports = router;