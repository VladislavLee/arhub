package com.myar.content.manager.entities.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;
    @CreatedDate
    private LocalDateTime created;

    private String title;
    @Lob
    @Column
    private String description;
    private String previewImageId;
    private String markerImageId;
    private String markerVanillaMarkerId;
    private String modelId;
    @ElementCollection
    private List<BigDecimal> rotation;
    @ElementCollection
    private List<BigDecimal> translation;
    @ElementCollection
    private List<BigDecimal> scale;

    @ManyToOne
    @JoinColumn(name="city_id", nullable=false)
    private City city;
    @ManyToOne
    @JoinColumn(name="author_id", nullable=false)
    private Author author;
    @OneToMany(mappedBy="post")
    private List<Like> likes;
    @OneToMany(mappedBy="post")
    private List<Comment> comments;
}
