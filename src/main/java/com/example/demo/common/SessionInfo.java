package com.example.demo.common;

import com.example.demo.entity.User;

public class SessionInfo {
    private Long createTime;
    private User user;


    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
