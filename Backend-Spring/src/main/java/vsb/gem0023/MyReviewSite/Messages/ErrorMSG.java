package vsb.gem0023.MyReviewSite.Messages;

import lombok.Data;

@Data
public class ErrorMSG {
    private String error;
    private String message;
    private long timestamp;

    public ErrorMSG(String error, String message) {
        this.error = error;
        this.message = message;
        this.timestamp = System.currentTimeMillis();
    }

}