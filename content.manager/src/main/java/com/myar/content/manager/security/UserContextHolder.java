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
    private final ThreadLocal<String> threadLocalValue = new ThreadLocal<>();

    public Author getUser() {
        String username = threadLocalValue.get();
        if(username == null){
            username = "user1";
        }
        return authorRepository.findByUsername(username);
    }

    public void setUser(String userName){
        threadLocalValue.set(userName);
    }
}
