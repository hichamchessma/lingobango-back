package com.lingobango.conjugaison;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "conjugaisons")
public class Conjugaison {
    @Id
    private String id;
    private String verbe;
    private String langue;
    private List<String> pronoms;
    private Map<String, List<String>> conjugaisons;

    public Conjugaison() {}

    public Conjugaison(String verbe, String langue, List<String> pronoms, Map<String, List<String>> conjugaisons) {
        this.verbe = verbe;
        this.langue = langue;
        this.pronoms = pronoms;
        this.conjugaisons = conjugaisons;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getVerbe() { return verbe; }
    public void setVerbe(String verbe) { this.verbe = verbe; }
    public String getLangue() { return langue; }
    public void setLangue(String langue) { this.langue = langue; }
    public List<String> getPronoms() { return pronoms; }
    public void setPronoms(List<String> pronoms) { this.pronoms = pronoms; }
    public Map<String, List<String>> getConjugaisons() { return conjugaisons; }
    public void setConjugaisons(Map<String, List<String>> conjugaisons) { this.conjugaisons = conjugaisons; }
}
