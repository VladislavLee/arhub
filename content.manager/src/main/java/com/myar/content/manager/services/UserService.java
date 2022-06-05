package com.myar.content.manager.services;

import com.myar.content.manager.entities.model.Like;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.repositories.LikeRepository;
import com.myar.content.manager.repositories.AuthorRepository;
import com.myar.content.manager.security.UserContextHolder;
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
    private final UserContextHolder userContextHolder;


    public Author createAuthor(Author author){
        return authorRepository.save(author);
    }
    public List<Author> getLastRatedUsersByPost(Post post) {
        return likeRepository.findLastRated(post, LAST_RATED_COUNT)
                .stream()
                .map(Like::getAuthor)
                .collect(Collectors.toList());
    }

    public Author findUserById(UUID userId){
        return authorRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }

    public Author findUserByUserName(String username){
        return authorRepository.findByUsername(username);
    }

    public void subscribeToUser(UUID userId){
        Author currentAuthor = userContextHolder.getUser();
        Author targetAuthor = authorRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        targetAuthor.getSubscription().add(currentAuthor);
        authorRepository.save(targetAuthor);
    }

    public void unSubscribeFromUser(UUID userId){
        Author currentAuthor = userContextHolder.getUser();
        Author targetAuthor = authorRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        List<Author> subscriptions = targetAuthor.getSubscription().stream()
                .filter(x->x.getId()!=currentAuthor.getId())
                .collect(Collectors.toList());
        targetAuthor.setSubscription(subscriptions);
        authorRepository.save(targetAuthor);
    }
}
