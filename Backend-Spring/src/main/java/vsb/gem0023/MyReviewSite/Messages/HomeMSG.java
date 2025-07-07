package vsb.gem0023.MyReviewSite.Messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import vsb.gem0023.MyReviewSite.Entities.GameReview;
import vsb.gem0023.MyReviewSite.Entities.News;

import java.util.List;

@Data
@AllArgsConstructor
public class HomeMSG {
    private List<GameReview> gameReviews;
    private List<GameReview> graphReviews1;
    private List<GameReview> graphReviews2;
    private List<GameReview> graphReviews3;
    private List<News> news;
}
