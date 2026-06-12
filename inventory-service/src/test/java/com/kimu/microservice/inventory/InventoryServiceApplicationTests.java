package com.kimu.microservice.inventory;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.web.client.RestClient;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InventoryServiceApplicationTests {

	@LocalServerPort
	private Integer port;

	private RestClient restClient;

	@BeforeEach
	void setup() {
		this.restClient = RestClient.builder().baseUrl("http://localhost:" + port).build();
	}

	@Test
	void shouldReadInventory() {
		// boolean response = RestAssured.given()
		// .when()
		// .get("/api/inventory?skuCode=iphone_15&quantity=1")
		// .then().log().all()
		// .statusCode(200)
		// .extract()
		// .response().as(Boolean.class);
		// assertTrue(response);

		// boolean negativeResponse = RestAssured.given()
		// .when()
		// .get("/api/inventory?skuCode=iphone_15&quantity=1000")
		// .then().log().all()
		// .statusCode(200)
		// .extract()
		// .response().as(Boolean.class);
		// assertFalse(negativeResponse);

		// Test 1: Positive Case
		Boolean response = restClient.get()
				.uri("/api/inventory?skuCode=iphone_5&quantity=1")
				.retrieve()
				.body(Boolean.class);

		assertTrue(Boolean.TRUE.equals(response));

		// Test 2: Negative Case
		Boolean negativeResponse = restClient.get()
				.uri("/api/inventory?skuCode=iphone_5&quantity=1000")
				.retrieve()
				.body(Boolean.class);

		assertFalse(Boolean.TRUE.equals(negativeResponse));
	}

}
