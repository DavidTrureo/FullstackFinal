package com.backend.cartapp.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.backend.cartapp.services.ProductService;
import com.backend.cartapp.models.entities.Product;
import com.backend.cartapp.models.dto.ProductRequest;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta si tu frontend corre en otro puerto
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> list() {
        return service.findAll();
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ProductRequest request){
        try{
            Product p = new Product();
            p.setName(request.getName());
            p.setDescription(request.getDescription());
            p.setPrice(request.getPrice());
            p.setImage(request.getImage());
            p.setColor(request.getColor());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(p));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}