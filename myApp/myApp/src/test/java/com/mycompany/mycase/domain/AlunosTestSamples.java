package com.mycompany.mycase.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class AlunosTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Alunos getAlunosSample1() {
        return new Alunos().id(1L).nome("nome1").cpf(1).matricula(1).anoLetivo(1);
    }

    public static Alunos getAlunosSample2() {
        return new Alunos().id(2L).nome("nome2").cpf(2).matricula(2).anoLetivo(2);
    }

    public static Alunos getAlunosRandomSampleGenerator() {
        return new Alunos()
            .id(longCount.incrementAndGet())
            .nome(UUID.randomUUID().toString())
            .cpf(intCount.incrementAndGet())
            .matricula(intCount.incrementAndGet())
            .anoLetivo(intCount.incrementAndGet());
    }
}
