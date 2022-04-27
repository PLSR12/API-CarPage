import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import CarController from './app/controllers/CarController'
import TruckController from './app/controllers/TruckController'
import MotoController from './app/controllers/MotoController'
import BrandController from './app/controllers/BrandController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/cars', upload.single('file'), CarController.store)
routes.get('/cars', CarController.index)
routes.put('/cars/:id', upload.single('file'), CarController.update)

routes.post('/trucks', upload.single('file'), TruckController.store)
routes.get('/trucks', TruckController.index)
routes.put('/trucks/:id', upload.single('file'), TruckController.update)

routes.post('/motors', upload.single('file'), MotoController.store)
routes.get('/motors', MotoController.index)
routes.put('/motors/:id', upload.single('file'), MotoController.update)

routes.post('/brands', upload.single('file'), BrandController.store)
routes.get('/brands', BrandController.index)
routes.put('/brands/:id', upload.single('file'), BrandController.update)

export default routes
