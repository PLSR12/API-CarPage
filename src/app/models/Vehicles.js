import Sequelize, { Model } from 'sequelize'

class Vehicle extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `http://localhost:3100/vehicle-file/${this.path}`
          }
        }
      },

      {
        sequelize
      }
    )
    return this
  }
}

export default Vehicle
