package com.example.demo.service;
/*
 ** @autor cc
 ** @date 2023/2/16
 */

import com.example.demo.common.Result;
import com.example.demo.entity.Retouchinfo;

import java.util.List;
import java.util.Map;

public interface IRetouchinfoService {
    public Result addRetouch(Retouchinfo retouchinfo);
    public Result getRetouch(String openid);
    public List<Retouchinfo> getList(Map<String,String> params, Integer pageIndex, Integer pageSize,
                                 String sortField, String sortOrder);
    public List<Retouchinfo> getList(Map<String,String> params);
    public int getListNum(Map<String,String> params);
}
