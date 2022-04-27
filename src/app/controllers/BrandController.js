import * as Yup from 'yup'
import Brand from '../models/Brands'

class BrandCarController {
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

    const brandsExists = await Brand.findOne({
      where: {
        name
      }
    })

    if (brandsExists) {
      return response.status(400).json({
        error: 'Brand already exists'
      })
    }

    const { id } = await Brand.create({
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
    const brands = await Brand.findAll()

    return response.json(brands)
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

      const brand = await Brand.findByPk(id)

      if (!brand) {
        return response
          .status(401)
          .json({
            error: 'Brand not found, make sure your brand id is correct'
          })
      }

      let path
      if (request.file) {
        path = request.file.filename
      }

      await Brand.update(
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

export default new BrandCarController()
