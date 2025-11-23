package com.backend.cartapp.repositories;

import com.backend.cartapp.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}