package com.myar.content.manager.services;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.Comment;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.repositories.AuthorRepository;
import com.myar.content.manager.repositories.CommentRepository;
import com.myar.content.manager.repositories.PostRepository;
import com.myar.content.manager.security.UserContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final AuthorRepository authorRepository;
    private final UserContextHolder userContextHolder;
    private final PostRepository postRepository;

    public Comment createComment(UUID postId, String text) {
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        final Post post = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
        return commentRepository.save(Comment.builder()
                .text(text)
                .author(author)
                .post(post)
                .build());
    }

    public void deleteComment(UUID commentId) {
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        commentRepository.findById(commentId).ifPresent((x) -> {
            if (x.getAuthor().getId().equals(author.getId())) {
                commentRepository.delete(x);
            }
        });
    }

    public Comment editComment(UUID commentId, String text) {
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        return commentRepository.findById(commentId).map((x) -> {
            if (x.getAuthor().getId().equals(author.getId())) {
                x.setText(text);
                return commentRepository.save(x);
            }
            return x;
        }).orElseThrow(EntityNotFoundException::new);
    }

    public long getLikeCountByPost(Post post) {
        return commentRepository.countByPost(post);
    }
}
