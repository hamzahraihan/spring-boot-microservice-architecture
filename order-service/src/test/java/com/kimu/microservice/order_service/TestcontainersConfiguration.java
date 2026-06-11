package com.kimu.microservice.order_service;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.mysql.MySQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {

	@Bean
	@ServiceConnection
	MySQLContainer mysqlContainer() {
		DockerImageName mariadbImage = DockerImageName.parse("mariadb:11.2").asCompatibleSubstituteFor("mysql");
		return new MySQLContainer(mariadbImage);
	}

}
