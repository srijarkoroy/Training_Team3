package com.example.training;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.model.*;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import com.example.training.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class TestUserService {
    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindUser() throws Exception {
        UserDetailsDTO ud = new UserDetailsDTO();
        ud.setUserId(123L);
        User user = new User();
        user.setUserId(123L);
        Mockito.when(userRepository.findByUserId(123L)).thenReturn(Optional.of(user));

        Object found = userService.findUser(123L);
        assertEquals(found, ud);

        Object notFound = userService.findUser(12L);
        assertEquals(notFound, "user not found");
    }


    @Test
    public void testFindAccount() throws Exception {
        Account account = new Account();
        account.setAccNo(123L);
        given(accountRepository.findByAccNo(123L)).willReturn(Optional.of(account));

        Object found = userService.findAccount(123L);
        assertEquals(found, Optional.of(account));

        Object notFound = userService.findAccount(12L);
        assertEquals(notFound, "account not found");
    }

    @Test
    public void testFindTransaction() throws Exception {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(123L);
        given(transactionRepository.findByTransactionId(123L)).willReturn(Optional.of(transaction));

        Object found = userService.findTransaction(123L);
        assertEquals(found, Optional.of(transaction));

        Object notFound = userService.findTransaction(12L);
        assertEquals(notFound, "transaction not found");
    }

    @Test
    public void testSaveNewTransaction() throws Exception {
        Transaction transaction = new Transaction();
        String result = userService.saveNewTransaction(transaction);
        verify(transactionRepository).save(transaction);
        assertEquals(result, "Transaction Successful");
    }

    @Test
    public void testFindNewUser() throws Exception {
        UserDetails ud = new UserDetails();
        UserDetails udInvalid = new UserDetails();
        Account account = new Account();

        User user = new User();
        user.setUserId(123L);
		ud.setAccNo(123L);
		ud.setUser(user);
		udInvalid.setUser(user);

        UserDetailsDTO udDTO = new UserDetailsDTO();
        udDTO.setUserId(123L);
		udDTO.setRoles("USER");
		udDTO.setEnable(true);

        when(userRepository.save(ud.getUser())).thenReturn(user);
        when(accountRepository.findByAccNo(ud.getAccNo())).thenReturn(Optional.of(account));

        Object found = userService.saveNewUser(ud);
        assertEquals(found, udDTO);

        Object notFound = userService.saveNewUser(udInvalid);
        assertEquals(notFound, "User does not have a bank account");
    }

    @Test
    public void testFindBalance() throws Exception {
        AccountRequest balanceRequest = new AccountRequest();
        balanceRequest.setAccNo(123L);
        balanceRequest.setTransactionPassword("summa");
        Account account = new Account();
        account.setTransactionPassword("summa");
        account.setBalance(123F);
        when(accountRepository.findByAccNo(balanceRequest.getAccNo())).thenReturn(Optional.of(account));

        Map<String, Float> map = new HashMap<String, Float>();
        map.put("balance", account.getBalance());

        Object found = userService.findBalance(balanceRequest);
        assertEquals(found, map);

        account.setTransactionPassword("wrong");
        found = userService.findBalance(balanceRequest);
        assertEquals(found, "Incorrect Transaction password");

        AccountRequest invalidBalanceRequest = new AccountRequest();
        found = userService.findBalance(invalidBalanceRequest);
        assertEquals(found, "User does not have a bank account");
    }

    @Test
    public void testFindAllTransaction() throws Exception {
        AccountRequest balanceRequest = new AccountRequest();
        balanceRequest.setAccNo(123L);
        Account account = new Account();
        balanceRequest.setTransactionPassword("summa");
        account.setAccNo(123L);
        account.setTransactionPassword("summa");
        Transaction transaction = new Transaction();
        List<Transaction> transactionList = new ArrayList<Transaction>();
        transactionList.add(transaction);
        when(accountRepository.findByAccNo(123L)).thenReturn(Optional.of(account));
        when(transactionRepository.findAllBySenderAccNoOrRecipientAccNo(123L, 123L)).thenReturn((List<Transaction>) transactionList);

        Object found = userService.findAllTransaction(balanceRequest);
        assertEquals(found, transactionList);

        transactionList.clear();
        found = userService.findAllTransaction(balanceRequest);
        assertEquals(found, "transaction not found");

        account.setTransactionPassword("wrong");
        found = userService.findAllTransaction(balanceRequest);
        assertEquals(found, "Incorrect Transaction password");

        AccountRequest invalidBalanceRequest = new AccountRequest();
        found = userService.findAllTransaction(invalidBalanceRequest);
        assertEquals(found, "User does not have a bank account");
    }

    @Test
    public void testDoTransaction() throws Exception {
        PerformTransactionDetails performTransactionDetails = new PerformTransactionDetails();
        performTransactionDetails.setAccNo(123L);
        performTransactionDetails.setRecipientAccNo(124L);
        Account senderAccount = new Account();
        Account receiverAccount = new Account();
        senderAccount.setTransactionPassword("summa");
        performTransactionDetails.setTransactionPassword("summa");
        performTransactionDetails.setAmount(1F);
        senderAccount.setBalance(2F);
        receiverAccount.setBalance(2F);

        when(accountRepository.findByAccNo(123L)).thenReturn(Optional.of(senderAccount));
        when(accountRepository.findByAccNo(124L)).thenReturn(Optional.of(receiverAccount));

        Object found = userService.doTransaction(performTransactionDetails);
        assertEquals(found, "transaction executed successfully");

        performTransactionDetails.setAmount(2F);
        senderAccount.setBalance(1F);
        found = userService.doTransaction(performTransactionDetails);
        assertEquals(found, "Insufficient balance");

        performTransactionDetails.setTransactionPassword("wrong");
        found = userService.doTransaction(performTransactionDetails);
        assertEquals(found, "Incorrect Transaction Password");

        performTransactionDetails.setRecipientAccNo(12L);
        found = userService.doTransaction(performTransactionDetails);
        assertEquals(found, "Receiver does not have a bank account");

        performTransactionDetails.setAccNo(12L);
        found = userService.doTransaction(performTransactionDetails);
        assertEquals(found, "User does not have a bank account");
    }

    @Test
    public void testWithdrawAmount() throws Exception {
        Withdraw withdrawDetails = new Withdraw();
        withdrawDetails.setAccNo(123L);
        Account account = new Account();
        account.setTransactionPassword("summa");
        withdrawDetails.setTransactionPassword("summa");
        withdrawDetails.setAmount(1F);
        account.setBalance(1F);
        when(accountRepository.findByAccNo(123L)).thenReturn(Optional.of(account));

        Object found = userService.withdrawAmount(withdrawDetails);
        assertEquals(found, "Amount withdrawn successfully");

        withdrawDetails.setAmount(2F);
        found = userService.withdrawAmount(withdrawDetails);
        assertEquals(found, "Insufficient balance");

        withdrawDetails.setTransactionPassword("wrong");
        found = userService.withdrawAmount(withdrawDetails);
        assertEquals(found, "Incorrect Transaction Password");

        withdrawDetails.setAccNo(124L);
        found = userService.withdrawAmount(withdrawDetails);
        assertEquals(found, "User does not have a bank account");
    }

    @Test
    public void testSaveNewAccount() throws Exception {
        Account account = new Account();
        Object found = userService.saveNewAccount(account);
        verify(accountRepository).save(account);
    }

    @Test
    public void testFindUserAccounts() throws Exception {

        List<Long> accNos = new ArrayList<>();
        accNos.add(123L);
        Account account = new Account();
        account.setAccNo(123L);
        List<Account> accounts = new ArrayList<>();
        accounts.add(account);
        when(accountRepository.findByUserId(123L)).thenReturn(accounts);
        assertEquals(userService.findUserAccounts(123L), accNos);
        accounts.clear();
        accNos.clear();
        assertEquals(userService.findUserAccounts(123L), "No Accounts found for this user");
    }
}

