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
import vsb.gem0023.MyReviewSite.Entities.Game;
import vsb.gem0023.MyReviewSite.Messages.SearchMSG;
import vsb.gem0023.MyReviewSite.Services.SearchService;

@Data
@Log4j2
@RestController
@RequestMapping(path = "/api/search")
public class SearchController {
    private SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    @GetMapping
    public SearchMSG getMSG(@RequestParam String string,
                         @RequestParam(defaultValue = "0") int page,
                         @RequestParam(defaultValue = "10") int size){

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());

        Page<Game> newPage = searchService.findGamesByName(string, pageable);

        System.out.println("String: " + string + "; page: " + page + "; size: " + size);

        SearchMSG newMSG = new SearchMSG(newPage.getContent(), newPage.getTotalPages());
        log.info("New MSG: " + newMSG.toString());

        return newMSG;
    }

}
