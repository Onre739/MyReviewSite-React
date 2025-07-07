package vsb.gem0023.MyReviewSite.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Data
@ToString(exclude = {"game_reviews"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "game_platform")
public class GamePlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate release_date;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    @OneToMany(mappedBy = "game_platform", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<GameReview> game_reviews;
}
