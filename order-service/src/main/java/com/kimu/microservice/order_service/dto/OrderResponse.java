package com.kimu.microservice.order_service.dto;

import java.math.BigDecimal;

public record OrderResponse(String orderNumber, String skuCode, BigDecimal price, Integer quantity) {

}
