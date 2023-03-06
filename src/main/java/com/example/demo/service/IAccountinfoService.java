package com.example.demo.service;
/*
 ** @autor cc
 ** @date 2023/2/12
 */

import com.example.demo.common.Result;
import com.example.demo.entity.Accountinfo;
import org.apache.poi.ss.formula.functions.T;

import java.util.List;
import java.util.Map;

public interface IAccountinfoService {
    public List<Accountinfo> getAccountinfo(Map<String,String> params, Integer pageIndex, Integer pageSize,
                                            String sortField, String sortOrder);
    public int getListNum(Map<String,String> params);
    public Result<T> importExcel(List<Accountinfo> list);
    public Result delete(String rowguid);
    public Accountinfo getInfoByGuid(String rowguid);
    public Result editInfo(Accountinfo info);
    public Result addInfo(Accountinfo info);
}
