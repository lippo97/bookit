import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { libraryKeys } from '../models/Library';
import { LibraryService } from '../services/libraries';

const router = Router();

mapServiceRoutes(new LibraryService(), libraryKeys)(router);

export default router;
