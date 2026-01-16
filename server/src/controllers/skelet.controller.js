const ThemeService = require('../services/skelet.service');
const { Theme } = require('../../db/models');

class ThemeController {
  static async getAllThemes(req, res) {
    try {
      const { user } = res.locals;
      const skelets = await ThemeService.getThemes(user.id);

      return res.status(200).send(skelets);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getThemeById(req, res) {
    try {
      const { id } = req.params;
      const skelet = await ThemeService.getThemeById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');

      return res.status(200).send(skelet);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createTheme(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');

      const { user } = res.locals;
      const { name, description, status } = req.body;
      const { isValid, err } = Theme.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const newTheme = await ThemeService.createTheme({
        name,
        description,
        status,
        userId: user.id,
      });

      return res.status(201).send(newTheme);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateTheme(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const skelet = await ThemeService.getThemeById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');
      if (user.id !== skelet.userId) return res.status(400).send('Это не ваш скелет');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { name, description, status } = req.body;
      const { isValid, err } = Theme.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const updateTheme = await ThemeService.updateTheme(id, {
        name,
        description,
        status,
      });

      return res.status(200).json(updateTheme);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deleteTheme(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const skelet = await ThemeService.getThemeById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');
      if (user.id !== skelet.userId) return res.status(400).send('Это не ваш скелет');
      const deleteTheme = await ThemeService.deleteTheme(id);

      if (!deleteTheme) return res.status(200).send('Скелет не удален');

      return res.status(204).send('Скелет удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = ThemeController;
