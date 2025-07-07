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
@ToString(exclude = "games")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "developer")
public class Developer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String owner_company;

    @Column(nullable = false)
    private String headquartes;

    @Column(nullable = false)
    private LocalDate founded;

    @OneToMany(mappedBy = "developer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Game> games;
}
