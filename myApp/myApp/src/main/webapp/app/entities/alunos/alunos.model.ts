import dayjs from 'dayjs/esm';

export interface IAlunos {
  id: number;
  nome?: string | null;
  cpf?: number | null;
  matricula?: number | null;
  nascimento?: dayjs.Dayjs | null;
  anoLetivo?: number | null;
}

export type NewAlunos = Omit<IAlunos, 'id'> & { id: null };
