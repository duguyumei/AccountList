package com.example.demo.common;
/*
 ** @autor cc
 ** @date 2022/3/12
 ** 返回操作是否成功,非零为失败
 */

public class Result<T> {
    private String code;//返回码
    private String msg;//信息
    private T data;//泛型数据
    private String token;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Result(){

    }
    public Result(T me){
        this.data = data;
    }
    public Result(String msg){
        this.msg = msg;
    }

    public static Result success(){
        Result<Object> result = new Result<>();
        result.setCode("200");
        result.setMsg("success");
        return result;
    }

    public static <T>Result<T> success(T data){
        Result<T> result = new Result<>(data);
        result.setCode("200");
        result.setMsg("success");
        result.setData(data);
        return result;
    }

    public static Result success(String msg){
        Result result = new Result<>();
        result.setCode("200");
        result.setMsg(msg);
        return result;
    }

    public static Result error(String code,String msg){
        Result<Object> result = new Result<>();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }
}
