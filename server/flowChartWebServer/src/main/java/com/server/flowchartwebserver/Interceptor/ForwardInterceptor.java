package com.server.flowchartwebserver.Interceptor;

import com.server.flowchartwebserver.controller.CustomerController;
import com.server.flowchartwebserver.utils.RedisUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Dr.Awe
 * @date 2023-11-12 10:11
 */


public class ForwardInterceptor implements HandlerInterceptor {
    private final static Logger logger = LoggerFactory.getLogger(ForwardInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String requestURI = request.getRequestURI();
        logger.info(requestURI);
        response.sendRedirect("http://localhost:3000"+requestURI);
        return false;


    }
}
