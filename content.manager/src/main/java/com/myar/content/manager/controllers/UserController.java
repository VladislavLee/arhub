package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.mapper.UserMapper;
import com.myar.content.manager.entities.response.user.UserResponse;
import com.myar.content.manager.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RequiredArgsConstructor
@RestController("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable UUID id){
        return userMapper.convertAuthorToUserResponse(userService.findUserById(id));
    }
}
