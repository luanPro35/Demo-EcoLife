package com.ecolife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String activityType;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer carbonSaved;

    @Column(nullable = false)
    private Integer pointsEarned;

    @Column(nullable = false)
    private LocalDateTime activityDate;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean isVerified = false;

    @PrePersist
    protected void onCreate() {
        activityDate = LocalDateTime.now();
    }
}
