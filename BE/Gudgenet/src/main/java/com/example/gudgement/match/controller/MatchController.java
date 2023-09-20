import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.service.MatchService;
import com.example.gudgement.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping("/request")
    public ResponseEntity<String> requestMatch(@RequestBody MatchDto matchDto) {
        matchService.requestMatch(matchDto);

        return ResponseEntity.ok("Matching requested for player " + matchDto.getMemberId());
    }

    @PostMapping("/cancel")
    public void cancelMatch(@RequestBody MatchDto matchRequest) {
        matchService.cancelMatch(matchRequest);
    }
}
