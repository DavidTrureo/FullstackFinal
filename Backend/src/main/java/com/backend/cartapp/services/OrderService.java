package com.backend.cartapp.services;

import com.backend.cartapp.models.entities.Order;
import com.backend.cartapp.models.dto.OrderRequest;

public interface OrderService {
    Order createOrder(OrderRequest request);
    Order getOrderById(Long id);
}