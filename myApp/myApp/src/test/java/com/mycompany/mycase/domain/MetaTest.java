package com.mycompany.mycase.domain;

import static com.mycompany.mycase.domain.AlunosTestSamples.*;
import static com.mycompany.mycase.domain.MetaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.mycase.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MetaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meta.class);
        Meta meta1 = getMetaSample1();
        Meta meta2 = new Meta();
        assertThat(meta1).isNotEqualTo(meta2);

        meta2.setId(meta1.getId());
        assertThat(meta1).isEqualTo(meta2);

        meta2 = getMetaSample2();
        assertThat(meta1).isNotEqualTo(meta2);
    }

    @Test
    void alunoTest() {
        Meta meta = getMetaRandomSampleGenerator();
        Alunos alunosBack = getAlunosRandomSampleGenerator();

        meta.setAluno(alunosBack);
        assertThat(meta.getAluno()).isEqualTo(alunosBack);

        meta.aluno(null);
        assertThat(meta.getAluno()).isNull();
    }
}
