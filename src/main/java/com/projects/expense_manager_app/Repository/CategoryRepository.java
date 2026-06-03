package com.projects.expense_manager_app.Repository;

import com.projects.expense_manager_app.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository <Category,Integer> {
}

