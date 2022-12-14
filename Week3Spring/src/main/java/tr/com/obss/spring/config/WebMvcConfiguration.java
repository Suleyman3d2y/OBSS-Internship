package tr.com.obss.spring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tr.com.obss.spring.interceptor.RequestInInterceptor;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Autowired
    private RequestInInterceptor requestInInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       registry.addInterceptor(requestInInterceptor);
    }
}
