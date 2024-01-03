package aim.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import aim.server.dto.ChatGPTRequest;
import aim.server.dto.ChatGPTResponse;

@RestController
@RequestMapping("/bot")
public class CustomBotController {

  @Value("${OPEN_AI_MODEL}")
  private String model;

  @Value("${OPEN_AI_URL}")
  private String apiURL;

  @Autowired
  private RestTemplate template;

  @GetMapping("/chat")
  public String chat(@RequestParam("prompt") String prompt) {
    ChatGPTRequest request = new ChatGPTRequest(model, prompt);
    ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
    return chatGPTResponse.getChoices().get(0).getMessage().getContent();
  }
  
}
