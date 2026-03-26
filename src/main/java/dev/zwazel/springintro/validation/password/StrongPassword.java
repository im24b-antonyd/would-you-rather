package dev.zwazel.springintro.validation.password;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy =
        StrongPasswordValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface StrongPassword {
    String message() default "Password must contain 8+ chars, upper, lower, number & symbol";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}