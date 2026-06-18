package com.kimu.microservice.order_service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.wiremock.spring.EnableWireMock;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@EnableWireMock
class OrderServiceApplicationTests {

	@LocalServerPort
	private Integer port;

	@BeforeEach
	void setup() {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = port;
	}

	@Test
	void shouldCreateOrder() {
		String submitOrder = """
				{
					"skuCode": "iphone_5",
					"price": 1000,
					"quantity": 1
				}
				""";

		// using wiremock so testing http request to inventory service does not rely on
		// inventory service
		// in other word we dont need to activate inventory service to test http
		// request, instead the wiremock will give the stub response that we made before
		InventoryClientStubs.stubInventoryCall("iphone_5", 1);

		RestAssured.given()
				.contentType(ContentType.JSON)
				.body(submitOrder)
				.when()
				.post("/api/order")
				.then()
				.log().all()
				.statusCode(201)
				.extract().body().asString();
	}

}
