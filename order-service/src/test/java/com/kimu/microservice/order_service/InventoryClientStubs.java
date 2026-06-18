package com.kimu.microservice.order_service;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;

// wiremock will pretend to be inventory service, so that we dont have to turn on inventory service for the sake of testing http request 
public class InventoryClientStubs {

    public static void stubInventoryCall(String skuCode, Integer quantity) {
        stubFor(get(urlEqualTo("/api/inventory?skuCode=" + skuCode + "&quantity=" + quantity)).willReturn(
                aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody("true")));
    }
}
