import Sequelize from 'sequelize'

import Car from '../app/models/Car'
import Moto from '../app/models/Moto'
import Truck from '../app/models/Truck'
import Brand from '../app/models/Brands'
import Vehicle from '../app/models/Vehicles'

import configDataBase from '../config/database'

const models = [Car, Moto, Truck, Brand, Vehicle]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(configDataBase)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
