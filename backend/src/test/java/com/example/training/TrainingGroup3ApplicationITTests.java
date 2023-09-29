package com.example.training;

import com.example.training.controller.UserController;
import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import com.example.training.service.UserService;
import com.example.training.entity.User;
import com.example.training.model.UserDetailsDTO;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        Transaction transaction = new Transaction(1000L, 1000000003L, 1000000004L, 100F, Timestamp.valueOf("2018-09-01 09:01:15"), "test", "a@gmail.com", "ABCD@123", 1234567890L);
        ResponseEntity<Transaction> response = restTemplate.postForEntity(baseUrl, transaction, Transaction.class);
        assertEquals(1, h2Repository.findAll().size());
    }
}
