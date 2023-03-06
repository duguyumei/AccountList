package com.example.demo.entity;
/*
 ** @autor cc
 ** @date 2022/3/22
 */

import lombok.Data;
@Data//使用lombok后简化了javabean操作,不需要再写get/set方法,会自动的通过注解生成
public class User {
    private String rowguid; //id
    private String password; //密码
    private String loginid; //账号名
    private String dispalyname;
}
