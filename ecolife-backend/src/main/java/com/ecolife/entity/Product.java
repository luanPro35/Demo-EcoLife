package com.ecolife.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    private String imageUrl;

    private Integer stock;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private boolean isActive;

    // You can add more fields as needed, e.g., category, weight, etc.
}
