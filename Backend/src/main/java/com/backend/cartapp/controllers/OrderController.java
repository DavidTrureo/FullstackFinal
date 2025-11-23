package com.backend.cartapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.cartapp.models.dto.OrderRequest;
import com.backend.cartapp.models.entities.Order;
import com.backend.cartapp.services.OrderServiceImpl;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderServiceImpl service;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderRequest request) {
        try {
            Order order = service.createOrder(request);
            OrderRequest response = service.toResponse(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        Order order = service.getOrderById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        OrderRequest response = service.toResponse(order);
        return ResponseEntity.ok(response);
    }
}