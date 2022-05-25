package com.myar.content.manager.repositories;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.Like;
import com.myar.content.manager.entities.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LikeRepository extends CrudRepository<Like, UUID> {

    List<Like> findDistinctUserByPost(Post post, Pageable pageable);

    Optional<Like> findByPostAndAuthor(Post post, Author author);

    long countByPost(Post post);

    default List<Like> findLastRated(Post post, int ratedCount) {
        return findDistinctUserByPost(post, PageRequest.of(0, ratedCount, Sort.by("created")));
    }
}
