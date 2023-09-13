package com.example.training.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> userNotFoundResponse(Exception ex, WebRequest request){
        ErrorResponse errorResponse = new ErrorResponse("404", ex.getMessage());
        return handleExceptionInternal(ex, errorResponse, null, HttpStatus.NOT_FOUND, request);
    }
}
