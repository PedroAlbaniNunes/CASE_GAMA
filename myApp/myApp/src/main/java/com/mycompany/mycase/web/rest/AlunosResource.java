package com.mycompany.mycase.web.rest;

import com.mycompany.mycase.domain.Alunos;
import com.mycompany.mycase.repository.AlunosRepository;
import com.mycompany.mycase.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.mycase.domain.Alunos}.
 */
@RestController
@RequestMapping("/api/alunos")
@Transactional
public class AlunosResource {

    private static final Logger LOG = LoggerFactory.getLogger(AlunosResource.class);

    private static final String ENTITY_NAME = "alunos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlunosRepository alunosRepository;

    public AlunosResource(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    /**
     * {@code POST  /alunos} : Create a new alunos.
     *
     * @param alunos the alunos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alunos, or with status {@code 400 (Bad Request)} if the alunos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Alunos> createAlunos(@RequestBody Alunos alunos) throws URISyntaxException {
        LOG.debug("REST request to save Alunos : {}", alunos);
        if (alunos.getId() != null) {
            throw new BadRequestAlertException("A new alunos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        alunos = alunosRepository.save(alunos);
        return ResponseEntity.created(new URI("/api/alunos/" + alunos.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, alunos.getId().toString()))
            .body(alunos);
    }

    /**
     * {@code PUT  /alunos/:id} : Updates an existing alunos.
     *
     * @param id the id of the alunos to save.
     * @param alunos the alunos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alunos,
     * or with status {@code 400 (Bad Request)} if the alunos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alunos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Alunos> updateAlunos(@PathVariable(value = "id", required = false) final Long id, @RequestBody Alunos alunos)
        throws URISyntaxException {
        LOG.debug("REST request to update Alunos : {}, {}", id, alunos);
        if (alunos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alunos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alunosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        alunos = alunosRepository.save(alunos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alunos.getId().toString()))
            .body(alunos);
    }

    /**
     * {@code PATCH  /alunos/:id} : Partial updates given fields of an existing alunos, field will ignore if it is null
     *
     * @param id the id of the alunos to save.
     * @param alunos the alunos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alunos,
     * or with status {@code 400 (Bad Request)} if the alunos is not valid,
     * or with status {@code 404 (Not Found)} if the alunos is not found,
     * or with status {@code 500 (Internal Server Error)} if the alunos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Alunos> partialUpdateAlunos(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Alunos alunos
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Alunos partially : {}, {}", id, alunos);
        if (alunos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alunos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alunosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Alunos> result = alunosRepository
            .findById(alunos.getId())
            .map(existingAlunos -> {
                if (alunos.getNome() != null) {
                    existingAlunos.setNome(alunos.getNome());
                }
                if (alunos.getCpf() != null) {
                    existingAlunos.setCpf(alunos.getCpf());
                }
                if (alunos.getMatricula() != null) {
                    existingAlunos.setMatricula(alunos.getMatricula());
                }
                if (alunos.getNascimento() != null) {
                    existingAlunos.setNascimento(alunos.getNascimento());
                }
                if (alunos.getAnoLetivo() != null) {
                    existingAlunos.setAnoLetivo(alunos.getAnoLetivo());
                }

                return existingAlunos;
            })
            .map(alunosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alunos.getId().toString())
        );
    }

    /**
     * {@code GET  /alunos} : get all the alunos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alunos in body.
     */
    @GetMapping("")
    public List<Alunos> getAllAlunos() {
        LOG.debug("REST request to get all Alunos");
        return alunosRepository.findAll();
    }

    /**
     * {@code GET  /alunos/:id} : get the "id" alunos.
     *
     * @param id the id of the alunos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alunos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Alunos> getAlunos(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Alunos : {}", id);
        Optional<Alunos> alunos = alunosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alunos);
    }

    /**
     * {@code DELETE  /alunos/:id} : delete the "id" alunos.
     *
     * @param id the id of the alunos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlunos(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Alunos : {}", id);
        alunosRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
