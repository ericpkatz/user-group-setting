var router = require('express').Router();
module.exports = router;

router.use('/sessions', require('./sessions'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
