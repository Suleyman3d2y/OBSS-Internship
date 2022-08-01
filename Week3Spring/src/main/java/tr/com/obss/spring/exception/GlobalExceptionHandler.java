package tr.com.obss.spring.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Exception ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error","Unknown error occurred");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }





}
