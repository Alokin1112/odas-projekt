package odas.dawidszcz.services;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class BruteForceProtector {
    private final static int MAX_ATTEMPTS = 8;
    private LoadingCache<String, Integer> attemptsCache;

    @Autowired
    private HttpServletRequest request;

    public BruteForceProtector(){
        attemptsCache = CacheBuilder.newBuilder().expireAfterWrite(Duration.ofDays(2)).build(new CacheLoader<String, Integer>() {
            @Override
            public Integer load(String key) throws Exception {
                return 0;
            }
        });
    }

    public void registerFailedLogin(String address) {
        int attempts;
        try {
            attempts = attemptsCache.get(address);
        } catch ( Exception e){
            attempts = 0;
        }
        attempts++;
        System.out.println(attempts + "  " + address);
        attemptsCache.put(address,attempts);
    }

    public boolean isBlocked() {
        try {
            System.out.println(attemptsCache.get(getClientIP()) >= MAX_ATTEMPTS ? "Nie moze":"Jeszcze moze");
            return attemptsCache.get(getClientIP()) >= MAX_ATTEMPTS;
        } catch (final Exception e) {
            return false;
        }
    }

    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || !xfHeader.contains(request.getRemoteAddr())) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
