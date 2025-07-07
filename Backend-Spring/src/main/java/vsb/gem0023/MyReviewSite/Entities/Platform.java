package vsb.gem0023.MyReviewSite.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@ToString(exclude = {"game_platforms", "dlc_platforms"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "platform")
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<GamePlatform> game_platforms;

    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DLCPlatform> dlc_platforms;
}
