package dev.zwazel.springintro.wyr;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Wyr {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String questionText;

    // This connects the two tables
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "wyr_id") // Creates a foreign key in the Option table
    private List<WyrOption> options;

    // Getters and Setters
}

