const express = require('express');
const ThemeController = require('../controllers/theme.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', verifyAccessToken, ThemeController.getAllThemes);
router.post('/', verifyAccessToken, ThemeController.createTheme);
router.get('/:id', isValidId, ThemeController.getThemeById);
router.put('/:id', isValidId, verifyAccessToken, ThemeController.updateTheme);
router.delete('/:id', isValidId, verifyAccessToken, ThemeController.deleteTheme);

module.exports = router;
