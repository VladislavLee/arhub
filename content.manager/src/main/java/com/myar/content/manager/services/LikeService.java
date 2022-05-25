package com.myar.content.manager.services;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.Like;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.repositories.AuthorRepository;
import com.myar.content.manager.repositories.LikeRepository;
import com.myar.content.manager.repositories.PostRepository;
import com.myar.content.manager.security.UserContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final AuthorRepository authorRepository;
    private final UserContextHolder userContextHolder;
    private final PostRepository postRepository;

    public long getLikeCountByPost(Post post){
        return likeRepository.countByPost(post);
    }
    public void likePost(UUID postId){
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        likeRepository.save(Like.builder()
                .author(author)
                .post(postRepository.findById(postId).orElseThrow(EntityNotFoundException::new))
                .build());
    }

    public void unlikePost(UUID postId){
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        final Post post = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
        likeRepository.findByPostAndAuthor(post, author).ifPresent(likeRepository::delete);
    }
}
