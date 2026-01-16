const { Theme } = require('../../db/models');

class ThemeService {
  static async getThemes() {
    return Theme.findAll();
  }

  static async getThemeById(id) {
    return Theme.findByPk(id);
  }
}

module.exports = ThemeService;
