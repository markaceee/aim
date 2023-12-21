package aim.server.dto;

import com.google.gson.annotations.SerializedName;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
// @JsonInclude(JsonInclude.Include.ALWAYS)
public class Links {
    @SerializedName("href")
    private String href;

    @SerializedName("method")
    private String method;

    @SerializedName("rel")
    private String rel;
}
