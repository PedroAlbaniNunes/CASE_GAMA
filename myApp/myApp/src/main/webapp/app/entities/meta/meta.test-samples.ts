import { IMeta, NewMeta } from './meta.model';

export const sampleWithRequiredData: IMeta = {
  id: 17187,
};

export const sampleWithPartialData: IMeta = {
  id: 17853,
  notaAnterior: 21225.3,
  area: 'MATEMATICA_E_SUAS_TECNOLOGIAS',
};

export const sampleWithFullData: IMeta = {
  id: 32703,
  notaAnterior: 5776.6,
  valor: 406.41,
  area: 'MATEMATICA_E_SUAS_TECNOLOGIAS',
};

export const sampleWithNewData: NewMeta = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
