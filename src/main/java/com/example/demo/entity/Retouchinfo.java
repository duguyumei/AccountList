package com.example.demo.entity;
/*
 ** @autor cc
 ** @date 2023/2/16
 */

import lombok.Data;

import java.util.UUID;

@Data
public class Retouchinfo {
    // retouchinfo
    private String rowguid; // 唯一标识
    private String retouchguid; // 修饰标识
    private String format_row; // 修饰行
    private String format_value; //修饰值
    private String yunsuanfu; // 运算符
    private String tiaojian_left; // 运算符左
    private String tiaojian_right; // 运算符右
    private String type_left; // 左类型
    private String type_right; // 右类型
    private String status; // 状态
    private int isreal;

    public Retouchinfo(){

    }

    public Retouchinfo(String retouchguid,String format_row, String format_value,String type_left,
                       String tiaojian_left,String yunsuanfu,String type_right,String tiaojian_right,
                       String status,int isreal){
        this.rowguid = UUID.randomUUID().toString();
        this.retouchguid = retouchguid;
        this.format_row = format_row;
        this.format_value = format_value;
        this.tiaojian_left = tiaojian_left;
        this.yunsuanfu = yunsuanfu;
        this.tiaojian_right = tiaojian_right;
        this.status = status;
        this.isreal = isreal;
    }
}
