package dev.zwazel.springintro.games.wyr;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> id(Long id);
    Optional<Question> findByAnswersContaining(Answer answer);

    @Query("SELECT MAX(q.id) FROM Question q")
    Optional<Long> findMaxId();
}
