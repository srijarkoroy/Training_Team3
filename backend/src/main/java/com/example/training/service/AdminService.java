package com.example.training.service;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.model.UserEnable;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    public Object setUserStatus(UserEnable userEnable) {
        Optional<User> user = userRepository.findByUserId(userEnable.getUserId());
        if (user.isEmpty()) {
            return "user not found";
        }
        user.ifPresent(userAcc->{userAcc.setEnable(userEnable.getEnable());});
        userRepository.save(user.get());
        if(userEnable.getEnable())
            return "User Account Enabled";
        return "User Account Disabled";
    }
    public Object findAllTransaction(Long accNo) {
        Optional<Account> account = accountRepository.findByAccNo(accNo);
        if(account.isEmpty())
            return "User does not have a bank account";
        Account userAccount = account.get();
        List<Transaction> transaction = transactionRepository.findAllBySenderAccNoOrRecipientAccNo(userAccount.getAccNo(), userAccount.getAccNo());
        if (transaction.isEmpty()) {
            return "transaction not found";
        }
        return transaction;
    }

}
