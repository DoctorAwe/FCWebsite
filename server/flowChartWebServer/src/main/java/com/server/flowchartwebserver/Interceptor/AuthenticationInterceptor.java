package com.server.flowchartwebserver.Interceptor;

import com.server.flowchartwebserver.controller.CustomerController;
import com.server.flowchartwebserver.utils.RedisUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.util.Objects;


@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Autowired
    private RedisUtils redisUtils;
    private final static Logger logger = LoggerFactory.getLogger(AuthenticationInterceptor.class);

    private <T> T getRedisUtil(Class<T> clazz, HttpServletRequest request){
        WebApplicationContext applicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
        return applicationContext.getBean(clazz);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        redisUtils = getRedisUtil(RedisUtils.class,request);
        String uid = null;
        String session = null;
        logger.info(request.getRequestURI());
        if (request.getCookies()==null) {
            response.sendRedirect("/auth/login");
            return false;
        }
        for (Cookie c : request.getCookies()) {
            if (Objects.equals(c.getName(), "uid")) {
                uid = c.getValue();
            } else if (Objects.equals(c.getName(), "session")) {
                session = c.getValue();
            }
        }

        String session_id = redisUtils.getSession(uid);
        if (session_id==null || !Objects.equals(session, session_id)) {
            response.sendRedirect("/auth/login");
            return false;
        }
        return true;

    }

//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
//        System.out.println("postHandle: " + request.getRequestURI());
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
//        System.out.println("afterCompletion: " + request.getRequestURI());
//    }
}




