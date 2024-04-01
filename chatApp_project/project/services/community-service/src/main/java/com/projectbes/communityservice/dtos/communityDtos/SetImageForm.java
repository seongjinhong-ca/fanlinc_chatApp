package com.projectbes.communityservice.dtos.communityDtos;

import javax.validation.constraints.NotNull;

/**
 * Form to set theme image in community
 */
public class SetImageForm {
    @NotNull
    private String link;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }


}
