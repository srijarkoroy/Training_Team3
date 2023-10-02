package com.example.training;

import com.example.training.entity.Transaction;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TrainingGroup3ApplicationITTests {

    @LocalServerPort
    private int port;

    private String baseUrl="http://localhost:8090/user/transactionDetails/createTransaction";

    private static RestTemplate restTemplate;

    @Autowired
    private TestH2Repository h2Repository;

    @BeforeAll
    public static void init(){
        restTemplate = new RestTemplate();
    }

//    @BeforeEach
//    public void setUp(){
//        baseUrl = baseUrl.concat(":").concat(port+"").concat("/user/transactionDetails");
//        System.out.print("Endpoint: "+baseUrl);
//    }

    @Test
    public void testCreateTransaction(){
        Transaction transaction = new Transaction(1000L, 1000000003L, 1000000004L, 100F, Timestamp.valueOf("2018-09-01 09:01:15"), "test");
        ResponseEntity<Transaction> response = restTemplate.postForEntity(baseUrl, transaction, Transaction.class);
        assertEquals(1, h2Repository.findAll().size());
    }
}
