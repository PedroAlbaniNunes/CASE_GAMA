package com.mycompany.mycase.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Alunos.
 */
@Entity
@Table(name = "alunos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Alunos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private Integer cpf;

    @Column(name = "matricula")
    private Integer matricula;

    @Column(name = "nascimento")
    private LocalDate nascimento;

    @Column(name = "ano_letivo")
    private Integer anoLetivo;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "aluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "aluno" }, allowSetters = true)
    private Set<Meta> metas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Alunos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Alunos nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCpf() {
        return this.cpf;
    }

    public Alunos cpf(Integer cpf) {
        this.setCpf(cpf);
        return this;
    }

    public void setCpf(Integer cpf) {
        this.cpf = cpf;
    }

    public Integer getMatricula() {
        return this.matricula;
    }

    public Alunos matricula(Integer matricula) {
        this.setMatricula(matricula);
        return this;
    }

    public void setMatricula(Integer matricula) {
        this.matricula = matricula;
    }

    public LocalDate getNascimento() {
        return this.nascimento;
    }

    public Alunos nascimento(LocalDate nascimento) {
        this.setNascimento(nascimento);
        return this;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public Integer getAnoLetivo() {
        return this.anoLetivo;
    }

    public Alunos anoLetivo(Integer anoLetivo) {
        this.setAnoLetivo(anoLetivo);
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public Set<Meta> getMetas() {
        return this.metas;
    }

    public void setMetas(Set<Meta> metas) {
        if (this.metas != null) {
            this.metas.forEach(i -> i.setAluno(null));
        }
        if (metas != null) {
            metas.forEach(i -> i.setAluno(this));
        }
        this.metas = metas;
    }

    public Alunos metas(Set<Meta> metas) {
        this.setMetas(metas);
        return this;
    }

    public Alunos addMetas(Meta meta) {
        this.metas.add(meta);
        meta.setAluno(this);
        return this;
    }

    public Alunos removeMetas(Meta meta) {
        this.metas.remove(meta);
        meta.setAluno(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alunos)) {
            return false;
        }
        return getId() != null && getId().equals(((Alunos) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Alunos{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf=" + getCpf() +
            ", matricula=" + getMatricula() +
            ", nascimento='" + getNascimento() + "'" +
            ", anoLetivo=" + getAnoLetivo() +
            "}";
    }
}
