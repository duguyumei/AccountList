package com.example.demo.service.Impl;
/*
 ** @autor cc
 ** @date 2023/2/17
 */

import com.example.demo.dao.ZiduanDao;
import com.example.demo.entity.Ziduaninfo;
import com.example.demo.service.IZiduanService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZiduanService implements IZiduanService {
    private ZiduanDao dao = new ZiduanDao();
    @Override
    public List<Ziduaninfo> getRiduanList() {
        return dao.getRiduanList();
    }
}
