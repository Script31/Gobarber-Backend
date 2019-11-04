import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Middlewares from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/Filecontroller';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableConttroller from './app/controllers/AvailableController';

import NotificationController from './app/controllers/NotificationController';

const routes = Router();

const upload = multer(multerConfig);

routes.post('/signup', UserController.store);
routes.post('/signin', SessionController.store);

routes.use(Middlewares);

routes.put('/update', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

// listar todos os providers
routes.get('/providers', ProviderController.store);
routes.get('/providers/:providerId/Available', AvailableConttroller.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

// notifications

routes.get('/notifications', NotificationController.index);

// notification readed

routes.put('/notifications/:id', NotificationController.update);

export default routes;
