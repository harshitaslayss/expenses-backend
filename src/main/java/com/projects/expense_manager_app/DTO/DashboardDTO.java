package com.projects.expense_manager_app.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDTO {
    private Long balance;
    private Long income;
    private Long expense;

}
