package vsb.gem0023.MyReviewSite.Controllers;

import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vsb.gem0023.MyReviewSite.Entities.GameReview;
import vsb.gem0023.MyReviewSite.Messages.ReviewMSG;
import vsb.gem0023.MyReviewSite.Services.ReviewService;

@Data
@RestController
@Log4j2
@RequestMapping(path = "/api/rev")
public class ReviewController {
    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewMSG reviewMSG) {
        log.info(reviewMSG);
        GameReview createdReview = reviewService.createGameReview(reviewMSG);
        return ResponseEntity.ok(createdReview);
    }

}
