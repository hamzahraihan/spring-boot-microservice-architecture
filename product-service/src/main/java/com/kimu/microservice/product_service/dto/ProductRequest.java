package com.kimu.microservice.product_service.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductRequest(
        @JsonIgnore @NotBlank String id,
        @Size(max = 200) String name,

        @Size(max = 200) String description,

        @Size(max = 10) String skuCode,

        BigDecimal price) {
}
