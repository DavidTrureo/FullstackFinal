package com.backend.cartapp.services;

import java.util.List;
import com.backend.cartapp.models.entities.Product;

public interface ProductService {
    List<Product> findAll();
    Product save(Product product);
}
