package com.myar.content.manager.security;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.repositories.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserContextHolder {

    private final AuthorRepository authorRepository;

    public Author getUser() {
        return authorRepository.findAll().iterator().next();
    }
}
