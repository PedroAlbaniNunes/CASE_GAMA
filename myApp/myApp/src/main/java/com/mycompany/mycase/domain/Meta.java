package com.mycompany.mycase.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.mycase.domain.enumeration.AreaDoEnem;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Meta.
 */
@Entity
@Table(name = "meta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Meta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nota_anterior")
    private Double notaAnterior;

    @Column(name = "valor")
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "area")
    private AreaDoEnem area;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "metas" }, allowSetters = true)
    private Alunos aluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Meta id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getNotaAnterior() {
        return this.notaAnterior;
    }

    public Meta notaAnterior(Double notaAnterior) {
        this.setNotaAnterior(notaAnterior);
        return this;
    }

    public void setNotaAnterior(Double notaAnterior) {
        this.notaAnterior = notaAnterior;
    }

    public Double getValor() {
        return this.valor;
    }

    public Meta valor(Double valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public AreaDoEnem getArea() {
        return this.area;
    }

    public Meta area(AreaDoEnem area) {
        this.setArea(area);
        return this;
    }

    public void setArea(AreaDoEnem area) {
        this.area = area;
    }

    public Alunos getAluno() {
        return this.aluno;
    }

    public void setAluno(Alunos alunos) {
        this.aluno = alunos;
    }

    public Meta aluno(Alunos alunos) {
        this.setAluno(alunos);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meta)) {
            return false;
        }
        return getId() != null && getId().equals(((Meta) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Meta{" +
            "id=" + getId() +
            ", notaAnterior=" + getNotaAnterior() +
            ", valor=" + getValor() +
            ", area='" + getArea() + "'" +
            "}";
    }
}
