package hjc.projet.ryoko.service;

import java.io.FileInputStream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseInitialize {

	@PostConstruct
	public void initialize() {
		try {
			FileInputStream serviceAccount = new FileInputStream( "./serviceAccount.json" ); // service account key

			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials( GoogleCredentials.fromStream( serviceAccount ) )
					.setDatabaseUrl( "https://ryoko-b304b-default-rtdb.europe-west1.firebasedatabase.app" ).build();

			FirebaseApp.initializeApp( options );
		} catch ( Exception e ) {
			e.printStackTrace();
		}
	}
}