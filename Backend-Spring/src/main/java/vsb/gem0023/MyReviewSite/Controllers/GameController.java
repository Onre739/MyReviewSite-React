package vsb.gem0023.MyReviewSite.Controllers;

import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vsb.gem0023.MyReviewSite.Entities.*;
import vsb.gem0023.MyReviewSite.Messages.GameMSG;
import vsb.gem0023.MyReviewSite.Services.GameService;

import java.util.List;
import java.util.Optional;

@Data
@Log4j2
@RestController
@RequestMapping(path = "/api/game")
public class GameController {

    private GameService gameService;

    @Autowired
    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @GetMapping
    public GameMSG getMSG(@RequestParam int id,
                          @RequestParam(defaultValue = "0") int page,
                          @RequestParam(defaultValue = "10") int size){

        Optional<Game> newGame = gameService.findGameById(id);

        List<Platform> platforms = gameService.findGamePlatforms(id);

        List<SubGenre> subGenres = gameService.findGameGenres(id);

        Pageable pageable = PageRequest.of(page, size, Sort.by("time").descending());
        Page<GameReview> newPage = gameService.findGameReviewsByGameId(id, pageable);

        GameMSG newMSG = new GameMSG(newGame, platforms, subGenres, newPage.getContent(), newPage.getTotalPages());

        return newMSG;
    }


}
