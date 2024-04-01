package com.projectbes.communityservice.dtos.eventDtos;

import javax.validation.constraints.NotNull;

/**
 * Form to create image from event
 */
public class ImageForm {
    @NotNull
    private Long eventId;
    @NotNull
    private String link;

    public Long getEventId() {
        return eventId;
    }

    public String getLink() {
        return link;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
