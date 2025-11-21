package com.backend.cartapp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.backend.cartapp.models.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {
    
}
