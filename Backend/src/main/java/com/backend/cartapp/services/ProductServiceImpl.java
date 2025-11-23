package com.backend.cartapp.services;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.cartapp.models.entities.Product;
import com.backend.cartapp.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Product save(Product product){
        // Asegurar que product no sea null para cumplir con las anotaciones de null-safety
        Objects.requireNonNull(product, "product must not be null");
        return repository.save(product);
    }
}