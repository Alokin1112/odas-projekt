package odas.dawidszcz.utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class CustomTextValidator implements ConstraintValidator<CustomText, String> {
    @Override
    public void initialize(CustomText constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        String regex = "^[a-zA-Z_]{6,255}$";
        Pattern pattern = Pattern.compile(regex);
        return pattern.matcher(s).matches();
    }
}
