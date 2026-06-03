package com.projects.expense_manager_app.Service;

import com.projects.expense_manager_app.DTO.DashboardDTO;
import com.projects.expense_manager_app.Entity.Transaction;
import com.projects.expense_manager_app.Entity.User;
import org.springframework.security.core.Authentication;

import java.util.Collection;
import java.util.List;

public interface TransactionService {
    List<Transaction> getTransactions();
    Transaction getTransaction(int id);
    List<Transaction> getUserTransactions(int userId);
    Transaction createTransaction(Transaction transaction);
    Transaction updateTransaction(int id, Transaction transaction);
    void deleteTransaction(int id);
    DashboardDTO getDashboardData();
    User getCurrentUser();


}
