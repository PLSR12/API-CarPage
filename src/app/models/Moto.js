import Sequelize, { Model } from 'sequelize'

class Moto extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        year: Sequelize.INTEGER,
        transmission: Sequelize.STRING,
        mileage: Sequelize.INTEGER,
        fuel: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://api-carpage-production.up.railway.app/vehicle-file/${this.path}`
          },
        },
      },

      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.belongsTo(models.Brand, {
      foreignKey: 'brand_id',
      as: 'brand',
    })
  }
}

export default Moto
