import { IAlunos } from 'app/entities/alunos/alunos.model';
import { AreaDoEnem } from 'app/entities/enumerations/area-do-enem.model';

export interface IMeta {
  id: number;
  notaAnterior?: number | null;
  valor?: number | null;
  area?: keyof typeof AreaDoEnem | null;
  aluno?: IAlunos | null;
}

export type NewMeta = Omit<IMeta, 'id'> & { id: null };
