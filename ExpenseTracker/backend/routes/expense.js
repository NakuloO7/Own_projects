const express = require('express');
const {addExpense, getExpense, removeExpense, updateExpense, markAsDoneOrUndone} = require("../controllers/expense");
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.route('/add').post(isAuthenticated, addExpense);
router.route('/getall').get(isAuthenticated, getExpense);
router.route('/remove/:id').delete(isAuthenticated, removeExpense);
router.route('/update/:id').put(isAuthenticated, updateExpense);
router.route('/:id/done').put(isAuthenticated, markAsDoneOrUndone);


module.exports = router;