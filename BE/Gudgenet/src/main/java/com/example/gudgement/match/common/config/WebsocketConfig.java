import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker  // Enable STOMP over WebSocket.
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register a STOMP endpoint at the given URL.
        registry.addEndpoint("/game").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Set prefixes for destinations of messages.
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic", "/queue");  // Use built-in simple message broker for subscriptions and broadcasting.

        /* If you want to use an external message broker like RabbitMQ, uncomment the following lines and comment out the line above. */
       /*
       registry.enableStompBrokerRelay("/topic", "/queue")
           .setRelayHost("localhost")
           .setRelayPort(61613)
           .setClientLogin("guest")
           .setClientPasscode("guest");
       */
    }
}
