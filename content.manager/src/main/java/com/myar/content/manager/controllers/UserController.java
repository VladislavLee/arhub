package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.mapper.UserMapper;
import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.request.user.CreateUserRequest;
import com.myar.content.manager.entities.response.user.UserResponse;
import com.myar.content.manager.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;


    @PostMapping
    public UUID createUser(@RequestBody CreateUserRequest createUserRequest) {
        return userService.createAuthor(userMapper.convertCreateUserRequestToAuthor(createUserRequest)).getId();
    }

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable("id") UUID userId) {
        return userMapper.convertAuthorToUserResponse(userService.findUserById(userId));
    }

    @GetMapping("/{username}/id")
    public UUID getUserIdBtUsername(@PathVariable("username") String username) {
        Author author = userService.findUserByUserName(username);
        if(author != null){
            return author.getId();
        } else {
            return null;
        }
    }

    @PostMapping("/subscribe/{id}")
    public void subscribe(@PathVariable("id") UUID userId) {
        userService.subscribeToUser(userId);
    }

    @PostMapping("/unsubscribe/{id}")
    public void unSubscribe(@PathVariable("id") UUID userId) {
        userService.unSubscribeFromUser(userId);
    }
}
