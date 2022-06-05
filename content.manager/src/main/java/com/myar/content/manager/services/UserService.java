package com.myar.content.manager.services;

import com.myar.content.manager.entities.model.Like;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.repositories.LikeRepository;
import com.myar.content.manager.repositories.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final int LAST_RATED_COUNT = 5;

    private final AuthorRepository authorRepository;
    private final LikeRepository likeRepository;

    public List<Author> getLastRatedUsersByPost(Post post) {
        return likeRepository.findLastRated(post, LAST_RATED_COUNT)
                .stream()
                .map(Like::getAuthor)
                .collect(Collectors.toList());
    }

    public Author findUserById(UUID userId){
        return authorRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }
}
