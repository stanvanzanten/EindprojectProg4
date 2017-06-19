package com.example.max.eindopdrachtprog4app.domain;

import java.io.Serializable;

/**
 * Created by Max on 14-6-2017.
 */

public class Film implements Serializable {

    private String description;
    private String film_id;
    private String language_id;
    private String last_update;
    private String length;
    private String original_language;
    private String rating;
    private String release_year;
    private String rental_duration;
    private String rental_date;
    private String replacement_cost;
    private String special_features;
    private String title;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFilm_id() {
        return film_id;
    }

    public void setFilm_id(String film_id) {
        this.film_id = film_id;
    }

    public String getLanguage_id() {
        return language_id;
    }

    public void setLanguage_id(String language_id) {
        this.language_id = language_id;
    }

    public String getLast_update() {
        return last_update;
    }

    public void setLast_update(String last_update) {
        this.last_update = last_update;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getOriginal_language() {
        return original_language;
    }

    public void setOriginal_language(String original_language) {
        this.original_language = original_language;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getRelease_year() {
        return release_year;
    }

    public void setRelease_year(String release_year) {
        this.release_year = release_year;
    }

    public String getRental_duration() {
        return rental_duration;
    }

    public void setRental_duration(String rental_duration) {
        this.rental_duration = rental_duration;
    }

    public String getRental_date() {
        return rental_date;
    }

    public void setRental_date(String rental_date) {
        this.rental_date = rental_date;
    }

    public String getReplacement_cost() {
        return replacement_cost;
    }

    public void setReplacement_cost(String replacement_cost) {
        this.replacement_cost = replacement_cost;
    }

    public String getSpecial_features() {
        return special_features;
    }

    public void setSpecial_features(String special_features) {
        this.special_features = special_features;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
