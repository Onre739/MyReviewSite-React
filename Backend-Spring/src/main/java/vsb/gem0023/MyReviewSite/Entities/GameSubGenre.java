package vsb.gem0023.MyReviewSite.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "game_sub_genre")
public class GameSubGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sub_genre_id", nullable = false)
    private SubGenre sub_genre;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
}
