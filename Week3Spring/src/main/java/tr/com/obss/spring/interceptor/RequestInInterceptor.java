package tr.com.obss.spring.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import tr.com.obss.spring.controller.UserController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Component
public class RequestInInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        request.setAttribute("startDate",new Date());
       LOGGER.info("Request interceptor started: {} {}", request.getRequestURI(), request.getMethod());
       return true;

    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        var startDate = (Date) request.getAttribute("startDate");
        var  endDate = new Date();
        var elapsed = endDate.getTime() - startDate.getTime();
        LOGGER.info("Request interceptor finished: {} {} time elapsed(in ms): {}", request.getRequestURI(), request.getMethod(),elapsed);

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
