package com.lingobango.conjugaison;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ConjugaisonRepository extends MongoRepository<Conjugaison, String> {
    Optional<Conjugaison> findByVerbeAndLangue(String verbe, String langue);
}
