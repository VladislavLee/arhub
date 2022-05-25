package com.myar.content.manager.repositories;

import com.myar.content.manager.entities.model.Comment;
import com.myar.content.manager.entities.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepository extends CrudRepository<Comment, UUID> {

    long countByPost(Post post);
}
