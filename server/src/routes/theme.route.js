const express = require('express');
const ThemeController = require('../controllers/theme.controller');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', ThemeController.getAllThemes);
router.get('/:id', isValidId, ThemeController.getThemeById);

module.exports = router;
