package com.backend.cartapp.models.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderRequest {
    private Long id;
    private String customerName;
    private String customerEmail;
    private String customerTel;
    private LocalDateTime createdAt;
    private List<OrderItemRequest> items;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerTel() { return customerTel; }
    public void setCustomerTel(String customerTel) { this.customerTel = customerTel; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
}