package com.lingobango.conjugaison;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ConjugaisonController {

    @Autowired
    private ConjugaisonRepository conjugaisonRepository;

    @GetMapping("/api/verbes")
    public List<String> getVerbes(@RequestParam(value = "q", required = false) String q,
                                  @RequestParam(defaultValue = "fr") String langue) {
        List<Conjugaison> all = conjugaisonRepository.findByLangue(langue);
        List<String> verbes = new ArrayList<>();
        for (Conjugaison c : all) {
            if (q == null || c.getVerbe().toLowerCase().startsWith(q.toLowerCase())) {
                verbes.add(c.getVerbe());
            }
        }
        return verbes;
    }

    @GetMapping("/api/conjugaison")
    public Map<String, Object> getConjugaison(
            @RequestParam(defaultValue = "etre") String verbe,
            @RequestParam(defaultValue = "present") String temps,
            @RequestParam(defaultValue = "fr") String langue) {

        Map<String, Object> result = new HashMap<>();
        result.put("verbe", verbe);
        result.put("temps", temps);

        // Recherche du verbe/langue en base
        Optional<Conjugaison> opt = conjugaisonRepository.findByVerbeAndLangue(verbe, langue);
        if (opt.isPresent()) {
            Conjugaison conj = opt.get();
            result.put("pronoms", conj.getPronoms());
            List<String> conjug = conj.getConjugaisons().get(temps);
            if (conjug == null) {
                result.put("conjugaisons", Arrays.asList("N/A", "N/A", "N/A", "N/A", "N/A", "N/A"));
            } else {
                result.put("conjugaisons", conjug);
            }
        } else {
            // Verbe non trouvé : pronoms selon la langue
            if ("en".equals(langue)) {
                result.put("pronoms", Arrays.asList("I", "You", "He/She/It", "We", "You", "They"));
            } else if ("es".equals(langue)) {
                result.put("pronoms", Arrays.asList("Yo", "Tú", "Él/Ella/Usted", "Nosotros", "Vosotros", "Ellos/Ellas"));
            } else {
                result.put("pronoms", Arrays.asList("Je", "Tu", "Il/Elle/On", "Nous", "Vous", "Ils/Elles"));
            }
            result.put("conjugaisons", Arrays.asList("N/A", "N/A", "N/A", "N/A", "N/A", "N/A"));
        }
        // Correction pronom "je" -> "j'" pour le passé composé en français
        if ("fr".equals(langue) && "passe".equals(temps)) {
            List<String> pronoms = (List<String>) result.get("pronoms");
            if (pronoms != null && pronoms.size() > 0 && pronoms.get(0).equalsIgnoreCase("je")) {
                List<String> pronomsMod = new ArrayList<>(pronoms);
                pronomsMod.set(0, "j'");
                result.put("pronoms", pronomsMod);
            }
        }
        return result;
    }
}
