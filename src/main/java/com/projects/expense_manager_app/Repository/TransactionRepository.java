package com.projects.expense_manager_app.Repository;

import com.projects.expense_manager_app.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    public List<Transaction> findByUserId(int userId);
}
