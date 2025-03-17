package com.mycompany.mycase.repository;

import com.mycompany.mycase.domain.Alunos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Alunos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlunosRepository extends JpaRepository<Alunos, Long> {}
