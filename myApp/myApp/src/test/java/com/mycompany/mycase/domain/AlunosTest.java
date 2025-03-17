package com.mycompany.mycase.domain;

import static com.mycompany.mycase.domain.AlunosTestSamples.*;
import static com.mycompany.mycase.domain.MetaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.mycase.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AlunosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alunos.class);
        Alunos alunos1 = getAlunosSample1();
        Alunos alunos2 = new Alunos();
        assertThat(alunos1).isNotEqualTo(alunos2);

        alunos2.setId(alunos1.getId());
        assertThat(alunos1).isEqualTo(alunos2);

        alunos2 = getAlunosSample2();
        assertThat(alunos1).isNotEqualTo(alunos2);
    }

    @Test
    void metasTest() {
        Alunos alunos = getAlunosRandomSampleGenerator();
        Meta metaBack = getMetaRandomSampleGenerator();

        alunos.addMetas(metaBack);
        assertThat(alunos.getMetas()).containsOnly(metaBack);
        assertThat(metaBack.getAluno()).isEqualTo(alunos);

        alunos.removeMetas(metaBack);
        assertThat(alunos.getMetas()).doesNotContain(metaBack);
        assertThat(metaBack.getAluno()).isNull();

        alunos.metas(new HashSet<>(Set.of(metaBack)));
        assertThat(alunos.getMetas()).containsOnly(metaBack);
        assertThat(metaBack.getAluno()).isEqualTo(alunos);

        alunos.setMetas(new HashSet<>());
        assertThat(alunos.getMetas()).doesNotContain(metaBack);
        assertThat(metaBack.getAluno()).isNull();
    }
}
