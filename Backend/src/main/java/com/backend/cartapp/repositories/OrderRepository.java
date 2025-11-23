package com.backend.cartapp.repositories;

import com.backend.cartapp.models.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}