package com.kimu.microservice.product_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimu.microservice.product_service.dto.ProductRequest;
import com.kimu.microservice.product_service.dto.ProductResponse;
import com.kimu.microservice.product_service.model.Product;
import com.kimu.microservice.product_service.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .skuCode(productRequest.skuCode())
                .price(productRequest.price())
                .build();
        productRepository.save(product);
        log.info("product created successfully");
        return toProductResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::toProductResponse).toList();
    }

    private ProductResponse toProductResponse(Product product) {
        return new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getSkuCode(),
                product.getPrice());
    }

}
