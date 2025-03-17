package com.mycompany.mycase.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class MetaTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Meta getMetaSample1() {
        return new Meta().id(1L);
    }

    public static Meta getMetaSample2() {
        return new Meta().id(2L);
    }

    public static Meta getMetaRandomSampleGenerator() {
        return new Meta().id(longCount.incrementAndGet());
    }
}
