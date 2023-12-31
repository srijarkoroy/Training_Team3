package com.example.training.service;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.model.*;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public Object findUser(Long id) {
        Optional<User> user = userRepository.findByUserId(id);
        if (user.isEmpty()) {
            return "user not found";
        }
        if (!accountRepository.findByUserId(id).isEmpty()) {
            Account account = accountRepository.findByUserId(id).get(0);
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            user.ifPresent(userDetails -> {
                userDetailsDTO.setUserId(userDetails.getUserId());
                userDetailsDTO.setFirstName(account.getFirstName());
                userDetailsDTO.setLastName(account.getLastName());
                userDetailsDTO.setEmail(account.getEmail());
                userDetailsDTO.setPhone(account.getPhone());
                userDetailsDTO.setRoles(userDetails.getRoles());
                userDetailsDTO.setEnable(userDetails.getEnable());
            });
            return userDetailsDTO;
        }

        return "User does not have a Bank Account";

    }

    public Object findAccount(Long acc) {
        Optional<Account> account = accountRepository.findByAccNo(acc);
        if (account.isEmpty()) {
            return "account not found";
        }
        return account;
    }

    public Object findBalance(AccountRequest accountRequest) {
        Optional<Account> account = accountRepository.findByAccNo(accountRequest.getAccNo());
        if (account.isEmpty())
            return "User does not have a bank account";
        Account userAccount = account.get();
        if (!Objects.equals(userAccount.getTransactionPassword(), accountRequest.getTransactionPassword()))
            return "Incorrect Transaction password";
        Map<String, Float> map = new HashMap<String, Float>();
        map.put("balance", userAccount.getBalance());
        return map;
    }

    public Object findTransaction(Long transact) {
        Optional<Transaction> transaction = transactionRepository.findByTransactionId(transact);
        if (transaction.isEmpty()) {
            return "transaction not found";
        }
        return transaction;
    }

    public Object findAllTransaction(AccountRequest accountRequest) {
        Optional<Account> account = accountRepository.findByAccNo(accountRequest.getAccNo());
        if (account.isEmpty())
            return "User does not have a bank account";
        Account userAccount = account.get();
        if (!Objects.equals(userAccount.getTransactionPassword(), accountRequest.getTransactionPassword()))
            return "Incorrect Transaction password";
        List<Transaction> transaction = transactionRepository.findAllBySenderAccNoOrRecipientAccNo(userAccount.getAccNo(), userAccount.getAccNo());
        if (transaction.isEmpty()) {
            return "transaction not found";
        }
        return transaction;
    }

    public Object doTransaction(PerformTransactionDetails performTransactionDetails) {
        Optional<Account> senderAccount = accountRepository.findByAccNo(performTransactionDetails.getAccNo());
        Optional<Account> receiverAccount = accountRepository.findByAccNo(performTransactionDetails.getRecipientAccNo());
        if (senderAccount.isEmpty())
            return "User does not have a bank account";
        if (receiverAccount.isEmpty())
            return "Receiver does not have a bank account";
        Account userAccount = senderAccount.get();
        if (!Objects.equals(performTransactionDetails.getTransactionPassword(), userAccount.getTransactionPassword()))
            return "Incorrect Transaction Password";
        if (performTransactionDetails.getAmount() > userAccount.getBalance()) {
            return "Insufficient balance";
        } else {
            userAccount.setBalance(userAccount.getBalance() - performTransactionDetails.getAmount());
            accountRepository.save(userAccount);
        }
        receiverAccount.ifPresent(recipientAccount -> {
            recipientAccount.setBalance(recipientAccount.getBalance() + performTransactionDetails.getAmount());
            accountRepository.save(recipientAccount);
        });
        Transaction transaction = new Transaction();
        transaction.setSenderAccNo(performTransactionDetails.getAccNo());
        transaction.setRecipientAccNo(performTransactionDetails.getRecipientAccNo());
        transaction.setAmount(performTransactionDetails.getAmount());
        transaction.setStatement(performTransactionDetails.getStatement());
        saveNewTransaction(transaction);
        return "transaction executed successfully";
    }

    public Object withdrawAmount(Withdraw withdrawDetails) {
        Optional<Account> account = accountRepository.findByAccNo(withdrawDetails.getAccNo());
        if (account.isEmpty())
            return "User does not have a bank account";
        Account userAccount = account.get();
        if (!Objects.equals(withdrawDetails.getTransactionPassword(), userAccount.getTransactionPassword()))
            return "Incorrect Transaction Password";
        if (withdrawDetails.getAmount() > userAccount.getBalance())
            return "Insufficient balance";
        userAccount.setBalance(userAccount.getBalance() - withdrawDetails.getAmount());
        accountRepository.save(userAccount);
        Transaction transaction = new Transaction();
        transaction.setSenderAccNo(withdrawDetails.getAccNo());
        transaction.setRecipientAccNo(withdrawDetails.getAccNo());
        transaction.setAmount(withdrawDetails.getAmount());
        transaction.setStatement("Cash Withdrawal");
        saveNewTransaction(transaction);
        return "Amount withdrawn successfully";
    }

    public Object saveNewUser(UserDetails userDetails) {
        Optional<Account> account = accountRepository.findByAccNo(userDetails.getAccNo());
        if (account.isEmpty()) {
            return "User does not have a bank account";
        }

        userDetails.getUser().setRoles("USER");
        userDetails.getUser().setEnable(true);
        User user = userRepository.save(userDetails.getUser());
        account.ifPresent(userAccount -> {
            userAccount.setUserId(user.getUserId());
            userAccount.setTransactionPassword(userDetails.getTransactionPassword());
            accountRepository.save(userAccount);
        });
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setUserId(user.getUserId());
        userDetailsDTO.setFirstName(account.get().getFirstName());
        userDetailsDTO.setLastName(account.get().getLastName());
        userDetailsDTO.setEmail(account.get().getEmail());
        userDetailsDTO.setPhone(account.get().getPhone());
        userDetailsDTO.setRoles(user.getRoles());
        userDetailsDTO.setEnable(user.getEnable());

        return userDetailsDTO;
    }

    public Object saveNewAccount(Account account) {
        account.setDateOfCreation(LocalDate.now());
        account.setBalance(0.0f);

        return accountRepository.save(account);
    }

    public String saveNewTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
        return "Transaction Successful";
    }

    public Object findUserAccounts(Long userId) {
        List<Long> accountNos = accountRepository.findByUserId(userId).stream()
                .map(Account::getAccNo).collect(Collectors.toList());
        if (accountNos.isEmpty())
            return "No Accounts found for this user";
        return accountNos;
    }

    public String setTransactionPassword(AccountRequest accountRequest) {
        Optional<Account> account = accountRepository.findByAccNo(accountRequest.getAccNo());
        if (account.isEmpty())
            return "No Accounts found for this account number";
        account.get().setTransactionPassword(accountRequest.getTransactionPassword());
        accountRepository.save(account.get());
        return "Transaction Password set successfully";
    }
}
