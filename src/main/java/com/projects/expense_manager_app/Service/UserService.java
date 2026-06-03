package com.projects.expense_manager_app.Service;

import com.projects.expense_manager_app.Entity.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    User getUser(int id);
    User createUser(User user);
    User updateUser(User user, int id);
    void deleteUser(int id);
    boolean authenticate(String username, String password);
}
