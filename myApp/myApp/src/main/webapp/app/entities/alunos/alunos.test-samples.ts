import dayjs from 'dayjs/esm';

import { IAlunos, NewAlunos } from './alunos.model';

export const sampleWithRequiredData: IAlunos = {
  id: 27863,
};

export const sampleWithPartialData: IAlunos = {
  id: 6876,
  nome: 'evenly opposite hm',
  cpf: 30741,
  matricula: 31089,
};

export const sampleWithFullData: IAlunos = {
  id: 6447,
  nome: 'nor',
  cpf: 10293,
  matricula: 20974,
  nascimento: dayjs('2025-03-16'),
  anoLetivo: 30284,
};

export const sampleWithNewData: NewAlunos = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
