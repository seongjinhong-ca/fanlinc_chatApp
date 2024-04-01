package com.projectbes.communityservice.utils;

import com.projectbes.communityservice.exceptions.InvalidRequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Date;

/**
 * This class contains some global helper methods
 * @author Minh Hoang Nguyen
 *
 */
public class Utils {

    private static final String DATE_FORMAT = "dd-MM-yyyy HH:mm";
    private static final SimpleDateFormat formatter;
    private static final DateTimeFormatter strictFormatter;

    static {
        formatter = new SimpleDateFormat(DATE_FORMAT);
        strictFormatter =
                DateTimeFormatter.ofPattern(DATE_FORMAT).withResolverStyle(ResolverStyle.STRICT);
    }

    /**
     * Converts string to Date type after checking if it strictly follows format
     * @param dateTimeString string to convert to Date
     * @return converted String as Date
     */
    public static Date convertToDate(String dateTimeString) {
        Date result;
        try {
            strictFormatter.parse(dateTimeString);
            result = formatter.parse(dateTimeString);
        }
        catch (DateTimeParseException | ParseException e) {
            throw new InvalidRequestBody("Please input valid date in  '" + DATE_FORMAT + "'");
        }
        return result;
    }
}
