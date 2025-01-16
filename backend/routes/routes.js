const {Router} = require('express');
const {search, saveFavCity, getFavCities, deleteFavCity} = require('../controller/controller');

const router = Router();

router.get('/getFavCities', getFavCities);
router.post('/saveFavCity', saveFavCity);
router.get('/search', search);
router.post('/deleteFavCity', deleteFavCity);


module.exports = router;