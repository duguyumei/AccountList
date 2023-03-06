package com.example.demo.service.Impl;
/*
 ** @autor cc
 ** @date 2023/2/16
 */

import com.example.demo.common.Result;
import com.example.demo.dao.RetouchinfoDao;
import com.example.demo.entity.Retouchinfo;
import com.example.demo.service.IRetouchinfoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RetouchinfoService implements IRetouchinfoService {
    private RetouchinfoDao dao = new RetouchinfoDao();

    @Override
    public Result addRetouch(Retouchinfo retouchinfo) {
        return dao.addRetouch(retouchinfo);
    }

    @Override
    public Result getRetouch(String openid) {
        return null;
    }

    @Override
    public List<Retouchinfo> getList(Map<String, String> params, Integer pageIndex, Integer pageSize, String sortField, String sortOrder) {
        return dao.getList(params,pageIndex,pageSize,sortField,sortOrder);
    }

    @Override
    public List<Retouchinfo> getList(Map<String, String> params) {
        return dao.getList(params);
    }

    @Override
    public int getListNum(Map<String, String> params) {
        return dao.getListNum(params);
    }
}
