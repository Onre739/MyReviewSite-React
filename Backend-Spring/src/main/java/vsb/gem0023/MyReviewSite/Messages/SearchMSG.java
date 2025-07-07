package vsb.gem0023.MyReviewSite.Messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import vsb.gem0023.MyReviewSite.Entities.Game;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchMSG {
    private List<Game> games;
    private int totalPages;
}
