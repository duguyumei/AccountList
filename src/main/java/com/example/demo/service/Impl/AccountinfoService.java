package com.example.demo.service.Impl;
/*
 ** @autor cc
 ** @date 2023/2/12
 */

import com.example.demo.common.Result;
import com.example.demo.dao.AccountinfoDao;
import com.example.demo.entity.Accountinfo;
import com.example.demo.service.IAccountinfoService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AccountinfoService implements IAccountinfoService {
    private AccountinfoDao dao = new AccountinfoDao();
    @Override
    public List<Accountinfo> getAccountinfo(Map<String,String> params, Integer pageIndex, Integer pageSize, String sortField, String sortOrder) {
        return dao.getAccountList(params,pageIndex,pageSize,sortField,sortOrder);
    }

    @Override
    public int getListNum(Map<String, String> params) {
        return dao.getListNum(params);
    }

    @Override
    public Result<T> importExcel(List<Accountinfo> list) {
        return dao.setAccountList(list);
    }

    @Override
    public Result delete(String rowguid) {
        return dao.delete(rowguid);
    }

    @Override
    public Accountinfo getInfoByGuid(String rowguid) {
        return dao.getInfoByGuid(rowguid);
    }

    @Override
    public Result editInfo(Accountinfo info) {
        return dao.editInfo(info);
    }

    @Override
    public Result addInfo(Accountinfo info) {
        return dao.addInfo(info);
    }

}
