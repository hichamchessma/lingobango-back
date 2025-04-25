package com.lingobango.conjugaison;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
public class ConjugaisonController {
    @GetMapping("/api/conjugaison")
    public Map<String, Object> getConjugaison(@RequestParam(defaultValue = "etre") String verbe,
                                              @RequestParam(defaultValue = "present") String temps) {
        // Données mockées pour la démo
        List<String> pronoms = Arrays.asList("Je", "Tu", "Il/Elle/On", "Nous", "Vous", "Ils/Elles");
        List<String> conjugaisons = Arrays.asList("suis", "es", "est", "sommes", "êtes", "sont");
        Map<String, Object> result = new HashMap<>();
        result.put("verbe", verbe);
        result.put("temps", temps);
        result.put("pronoms", pronoms);
        result.put("conjugaisons", conjugaisons);
        return result;
    }
}
