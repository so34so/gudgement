package com.example.gudgement.account.dto;

public class SelectedVirtualAccountUpdateRequest {
    private String email;
    private Long virtualAccountId;

    // getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getVirtualAccountId() {
        return virtualAccountId;
    }

    public void setVirtualAccountId(Long virtualAccountId) {
        this.virtualAccountId = virtualAccountId;
    }
}
