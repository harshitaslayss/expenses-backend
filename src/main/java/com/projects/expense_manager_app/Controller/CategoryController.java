package com.projects.expense_manager_app.Controller;

import com.projects.expense_manager_app.Entity.Category;
import com.projects.expense_manager_app.Repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    @PostMapping("/categories")
    public Category postCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }


}
