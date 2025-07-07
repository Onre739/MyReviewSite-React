package vsb.gem0023.MyReviewSite.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import vsb.gem0023.MyReviewSite.Entities.GameReview;
import vsb.gem0023.MyReviewSite.Entities.News;
import vsb.gem0023.MyReviewSite.Messages.HomeMSG;
import vsb.gem0023.MyReviewSite.Services.HomeService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/index")
public class HomeController {

    private HomeService homeService;

    @Autowired
    public  HomeController(HomeService homeService){
        this.homeService = homeService;
    }

    @GetMapping
    public HomeMSG getMSG(@RequestParam(defaultValue = "0") int newsPage,
                          @RequestParam(defaultValue = "3") int newsPageSize,
                          @RequestParam(defaultValue = "0") int gameReviewPage,
                          @RequestParam(defaultValue = "10") int gameReviewPageSize,
                          @RequestParam(defaultValue = "1") int graphGameId,
                          @RequestParam(defaultValue = "1") int graphPlatformId1,
                          @RequestParam(defaultValue = "2") int graphPlatformId2,
                          @RequestParam(defaultValue = "3") int graphPlatformId3){

        Pageable pageableNews = PageRequest.of(newsPage, newsPageSize, Sort.by("date").descending());
        Pageable pageableGameReviews = PageRequest.of(gameReviewPage, gameReviewPageSize, Sort.by("time").descending());

        Page<News> newPageNews = homeService.getNews(pageableNews);
        Page<GameReview> newPageGameReviews = homeService.getGameReviews(pageableGameReviews);

        List<GameReview> graphReviews1 = homeService.getGraphReviews(graphGameId, graphPlatformId1);
        List<GameReview> graphReviews2 = homeService.getGraphReviews(graphGameId, graphPlatformId2);
        List<GameReview> graphReviews3 = homeService.getGraphReviews(graphGameId, graphPlatformId3);

        return new HomeMSG(newPageGameReviews.getContent(), graphReviews1, graphReviews2, graphReviews3, newPageNews.getContent());
    }

    @PostMapping("/login")
    public String login(){
        return "OK";
    }

}
