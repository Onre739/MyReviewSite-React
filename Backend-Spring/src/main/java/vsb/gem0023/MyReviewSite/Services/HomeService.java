package vsb.gem0023.MyReviewSite.Services;

import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vsb.gem0023.MyReviewSite.Entities.GamePlatform;
import vsb.gem0023.MyReviewSite.Entities.GameReview;
import vsb.gem0023.MyReviewSite.Entities.News;
import vsb.gem0023.MyReviewSite.Repositories.GamePlatformRepository;
import vsb.gem0023.MyReviewSite.Repositories.GameReviewRepository;
import vsb.gem0023.MyReviewSite.Repositories.NewsRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class HomeService {
    private NewsRepository newsRepository;
    private GameReviewRepository gameReviewRepository;
    private GamePlatformRepository gamePlatformRepository;

    @Autowired
    public HomeService(NewsRepository newsRepository, GameReviewRepository gameReviewRepository, GamePlatformRepository gamePlatformRepository){
        this.newsRepository = newsRepository;
        this.gameReviewRepository = gameReviewRepository;
        this.gamePlatformRepository = gamePlatformRepository;
    }

    public Page<News> getNews(Pageable pageable){
        return newsRepository.findAll(pageable);
    }

    public Page<GameReview> getGameReviews(Pageable pageable){
        return gameReviewRepository.findAll(pageable);
    }

    public List<GameReview> getGraphReviews(int graphGameId, int graphPlatformId){

        List<GamePlatform> gps = gamePlatformRepository.findAllByGameId(graphGameId);
        GamePlatform gamePlatform = gps.stream()
                .filter(gp -> gp.getPlatform().getId().equals(graphPlatformId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Platform not found for this game"));;

        return gamePlatform.getGame_reviews()
                .stream()
                .sorted(Comparator.comparing(GameReview::getTime)) // Seřadí podle času (vzestupně)
                .collect(Collectors.toList());
    }
}
