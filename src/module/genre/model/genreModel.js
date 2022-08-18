const { Model, DataTypes } = require('sequelize');

class GenreModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof ReservationModel}
   */

  static setup(sequelizeInstance) {
    GenreModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,

        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Genre',
        tableName: 'genres',
        underscored: true,
        paranoid: true,
      },
    );
    return GenreModel;
  }
}

module.exports = GenreModel;
