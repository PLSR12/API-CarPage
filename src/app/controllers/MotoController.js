import * as Yup from 'yup'
import Moto from '../models/Moto'
import Brand from '../models/Brands'

class MotoController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      year: Yup.number().required(),
      transmission: Yup.string().required(),
      mileage: Yup.number().required(),
      fuel: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      brand_id: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { filename: path } = request.file
    const {
      name,
      year,
      transmission,
      mileage,
      fuel,
      description,
      price,
      brand_id
    } = request.body

    const moto = await Moto.create({
      name,
      year,
      transmission,
      mileage,
      fuel,
      description,
      price,
      path,
      brand_id
    })

    return response.json(moto)
  }

  async index (request, response) {
    const motors = await Moto.findAll({
      include: [
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name']
        }
      ]
    })

    return response.json(motors)
  }

  async update (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      year: Yup.number().required(),
      transmission: Yup.string().required(),
      mileage: Yup.number().required(),
      fuel: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      brand_id: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { id } = request.params

    const motoId = await Moto.findByPk(id)

    if (!motoId) {
      return response.status(401).json({
        error: 'Vehicles not found, verify your vehicles Id is correct.'
      })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const {
      name,
      year,
      transmission,
      mileage,
      fuel,
      description,
      price,
      brand_id
    } = request.body

    const moto = await Moto.update(
      {
        name,
        year,
        transmission,
        mileage,
        fuel,
        description,
        price,
        path,
        brand_id
      },

      { where: { id } }
    )
    return response.json({ id, name, year, fuel })
  }
}

export default new MotoController()
