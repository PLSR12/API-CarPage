import * as Yup from 'yup'
import Vehicle from '../models/Vehicles'
import Vehicle from './../models/Vehicles';

class VehicleController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { name } = request.body

    const { filename: path } = request.file

    const vehiclesExists = await Vehicle.findOne({
      where: {
        name
      }
    })

    if (vehiclesExists) {
      return response.status(400).json({
        error: 'vehicle already exists'
      })
    }

    const { id } = await Vehicle.create({
      name,
      path
    })

    return response.status(201).json({
      id,
      name
    })
  }

  catch (err) {
    console.log(err)
  }

  async index (request, response) {
    const vehicles = await Vehicle.findAll()

    return response.json(vehicles)
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({
          error: err.errors
        })
      }

      const { name } = request.body

      const { id } = request.params

      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return response
          .status(401)
          .json({
            error: 'vehicle not found, make sure your vehicle id is correct'
          })
      }

      let path
      if (request.file) {
        path = request.file.filename
      }

      await Vehicle.update(
        {
          name,
          path
        },

        { where: { id } }
      )

      return response.status(200).json({name, path})
    } catch (err) {}
  }
}

export default new VehicleController()
