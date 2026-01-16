const { Theme } = require('../../db/models');

class ThemeService {
  static async getThemes(id) {
    return Theme.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getThemeById(id) {
    return Theme.findByPk(id);
  }

  static async createTheme({ name, description, status, userId }) {
    return Theme.create({ name, description, status, userId });
  }

  static async updateTheme(id, { name, description, status }) {
    await Theme.update({ name, description, status }, { where: { id } });

    return Theme.findByPk(id);
  }

  static async deleteTheme(id) {
    await Theme.destroy({ where: { id } });

    return true;
  }
}

module.exports = ThemeService;
