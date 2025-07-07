package vsb.gem0023.MyReviewSite.Messages;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReviewMSG {
    private String user_mail;
    private Integer numerical_rev;
    private String written_rev;
    private Boolean recommendation;
    private LocalDateTime time;
    private Integer game_id;
    private String platform_name;
}
