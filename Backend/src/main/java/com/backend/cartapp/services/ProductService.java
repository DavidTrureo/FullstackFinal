package com.backend.cartapp.services;

import com.backend.cartapp.models.entities.Product;
import java.util.List;

public interface ProductService {
    List<Product> findAll();
    Product save(Product product);
}