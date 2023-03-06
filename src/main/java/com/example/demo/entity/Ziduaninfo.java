package com.example.demo.entity;
/*
 ** @autor cc
 ** @date 2023/2/17
 */

import lombok.Data;

import java.util.UUID;

@Data
public class Ziduaninfo {
    // ziduan
    private String rowguid; // 唯一标识
    private String chinese_name; // 中文名
    private String english_name; // 英文名
    private int status; //状态
    private String formguid; //表guid
    private String update_time;

    public Ziduaninfo(){

    }

    public Ziduaninfo(String chinese_name, String english_name, String formguid, int status, String update_time){
        this.rowguid = UUID.randomUUID().toString();
        this.chinese_name = chinese_name;
        this.english_name = english_name;
        this.status = status;
        this.formguid = formguid;
        this.update_time = update_time;
    }

}
