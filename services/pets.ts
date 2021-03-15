import BaseService from './base';
import Pet from '@/models/pet';

class PetsServices extends BaseService {
  constructor() {
    super(Pet, '');
  }
}

export default PetsServices;
