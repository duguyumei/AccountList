package com.example.demo.entity;
/*
 ** @autor cc
 ** @date 2023/2/17
 */

import lombok.Data;

@Data
public class Yunsuanfu {
    private String name;
    private String value;

    public Yunsuanfu(String name,String value){
        this.name = name;
        this.value = value;
    }
}
