package com.example.demo.service.Impl;
/*
 ** @autor cc
 ** @date 2022/3/23
 */

import com.example.demo.common.Result;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {
    private UserDao dao = new UserDao();

    @Override
    public Result edit(User user) {
        return dao.editInfo(user);
    }

    @Override
    public User getInfoById(String loginid) {
        return dao.getInfoById(loginid);
    }
}
