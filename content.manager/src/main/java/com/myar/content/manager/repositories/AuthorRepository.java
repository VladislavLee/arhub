package com.myar.content.manager.repositories;

import com.myar.content.manager.entities.model.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AuthorRepository extends CrudRepository<Author, UUID> {
}
