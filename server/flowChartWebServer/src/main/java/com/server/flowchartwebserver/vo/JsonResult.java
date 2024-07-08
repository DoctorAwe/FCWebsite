package com.server.flowchartwebserver.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public
class JsonResult<T> {

    private int code;
    private String msg;
    private T data;

    public static <E>JsonResult<E> success(E data){
        return new JsonResult<E>(0,"success",data);
    }
    public static <E>JsonResult<E> success(){ return new JsonResult<E>(0,"success",null); }
    public static <E>JsonResult<E> error(int code, String msg){
        return new JsonResult<E>(code,msg,null);
    }


}