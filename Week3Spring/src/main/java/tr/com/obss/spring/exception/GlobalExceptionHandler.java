package tr.com.obss.spring.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, MethodArgumentNotValidException ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error",ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, DataIntegrityViolationException ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error","Duplicate record found");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, IllegalArgumentException ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error",ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, AccessDeniedException ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error",ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Exception ex) {
        LOGGER.error(ex.getMessage(),ex);
        var map = new HashMap<>();
        map.put("error","Unknown error occurred");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }







}
