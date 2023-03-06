package com.example.demo.service;
/*
 ** @autor cc
 ** @date 2022/3/23
 */

import com.example.demo.common.Result;
import com.example.demo.entity.User;

public interface IUserService {
    public Result edit(User user);
    public User getInfoById(String id);
}
