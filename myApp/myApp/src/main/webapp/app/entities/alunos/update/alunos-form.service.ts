import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAlunos, NewAlunos } from '../alunos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlunos for edit and NewAlunosFormGroupInput for create.
 */
type AlunosFormGroupInput = IAlunos | PartialWithRequiredKeyOf<NewAlunos>;

type AlunosFormDefaults = Pick<NewAlunos, 'id'>;

type AlunosFormGroupContent = {
  id: FormControl<IAlunos['id'] | NewAlunos['id']>;
  nome: FormControl<IAlunos['nome']>;
  cpf: FormControl<IAlunos['cpf']>;
  matricula: FormControl<IAlunos['matricula']>;
  nascimento: FormControl<IAlunos['nascimento']>;
  anoLetivo: FormControl<IAlunos['anoLetivo']>;
};

export type AlunosFormGroup = FormGroup<AlunosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlunosFormService {
  createAlunosFormGroup(alunos: AlunosFormGroupInput = { id: null }): AlunosFormGroup {
    const alunosRawValue = {
      ...this.getFormDefaults(),
      ...alunos,
    };
    return new FormGroup<AlunosFormGroupContent>({
      id: new FormControl(
        { value: alunosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nome: new FormControl(alunosRawValue.nome),
      cpf: new FormControl(alunosRawValue.cpf),
      matricula: new FormControl(alunosRawValue.matricula),
      nascimento: new FormControl(alunosRawValue.nascimento),
      anoLetivo: new FormControl(alunosRawValue.anoLetivo),
    });
  }

  getAlunos(form: AlunosFormGroup): IAlunos | NewAlunos {
    return form.getRawValue() as IAlunos | NewAlunos;
  }

  resetForm(form: AlunosFormGroup, alunos: AlunosFormGroupInput): void {
    const alunosRawValue = { ...this.getFormDefaults(), ...alunos };
    form.reset(
      {
        ...alunosRawValue,
        id: { value: alunosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AlunosFormDefaults {
    return {
      id: null,
    };
  }
}
