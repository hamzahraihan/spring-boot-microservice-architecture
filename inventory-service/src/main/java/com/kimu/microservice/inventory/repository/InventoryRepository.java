package com.kimu.microservice.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimu.microservice.inventory.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    boolean existsBySkuCodeAndQuantityIsGreaterThanEqual(String skuCode, Integer quantity);
}