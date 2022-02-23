import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import { IStorageProvider } from './models/IStorageProvider';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
