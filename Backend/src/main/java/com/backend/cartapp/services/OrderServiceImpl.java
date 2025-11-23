package com.backend.cartapp.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.cartapp.models.dto.OrderItemRequest;
import com.backend.cartapp.models.dto.OrderRequest;
import com.backend.cartapp.models.entities.Order;
import com.backend.cartapp.models.entities.OrderItem;
import com.backend.cartapp.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository repository;

    @Override
    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerTel(request.getCustomerTel());

        order.setItems(request.getItems().stream().map(itemReq -> {
            OrderItem item = new OrderItem();
            item.setProductName(itemReq.getProductName());
            item.setPrice(itemReq.getPrice());
            item.setQuantity(itemReq.getQuantity());
            item.setOrder(order);
            return item;
        }).collect(Collectors.toList()));

        return repository.save(order);
    }

    @Override
    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        if (id == null) return null;
        return repository.findById(id).orElse(null);
    }

    // Conversión a DTO limpio
    public OrderRequest toResponse(Order order) {
        OrderRequest response = new OrderRequest();
        response.setId(order.getId());
        response.setCustomerName(order.getCustomerName());
        response.setCustomerEmail(order.getCustomerEmail());
        response.setCustomerTel(order.getCustomerTel());
        response.setCreatedAt(order.getCreatedAt());

        List<OrderItemRequest> items = order.getItems().stream().map(item -> {
            OrderItemRequest dto = new OrderItemRequest();
            dto.setProductName(item.getProductName());
            dto.setPrice(item.getPrice());
            dto.setQuantity(item.getQuantity());
            return dto;
        }).collect(Collectors.toList());

        response.setItems(items);
        return response;
    }
}