const ThemeService = require('../services/theme.service');

class ThemeController {
  static async getAllThemes(req, res) {
    try {
      const themes = await ThemeService.getThemes();

      return res.status(200).send(themes);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getThemeById(req, res) {
    try {
      const { id } = req.params;
      const theme = await ThemeService.getThemeById(id);

      if (!theme) return res.status(200).send('Такой темы нет');

      return res.status(200).send(theme);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = ThemeController;
