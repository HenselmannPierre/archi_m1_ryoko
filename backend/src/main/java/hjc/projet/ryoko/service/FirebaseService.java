package hjc.projet.ryoko.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.utilities.encoding.CustomClassMapper;

import hjc.projet.ryoko.model.Activity;
import hjc.projet.ryoko.model.Trip;
import hjc.projet.ryoko.model.User;

@Service
public class FirebaseService {

	private List<Activity> myactivities;

	public String saveUserDetails( User user ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();

		// si document() sans parametre, id automatiquement genere, ! a modifier
		ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection( "users" ).document( user.getName() )
				.set( user );

		return collectionsApiFuture.get().getUpdateTime().toString();// when the creation is created
	}

	// name is the documentid, ! a modifier
	public User getUserDetails( String name ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		DocumentReference documentReference = dbFirestore.collection( "users" ).document( name );
		ApiFuture<DocumentSnapshot> future = documentReference.get();

		DocumentSnapshot document = future.get();

		User user = null;

		if ( document.exists() ) {
			user = document.toObject( User.class );
			return user;
		} else
			return null;
	}

	public String updateUserDetails( User user ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();

		// si document() sans parametre, id automatiquement genere, ! a modifier
		ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection( "users" ).document( user.getName() )
				.set( user );

		return collectionsApiFuture.get().getUpdateTime().toString();// when the creation is created
	}

	public String deleteUser( String name ) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		// ! a modifier
		ApiFuture<WriteResult> writeResult = dbFirestore.collection( "users" ).document( name ).delete();
		return "Document with ID " + name + " has been deleted."; // ! a modifier
	}

	public List<Trip> getTrips() throws InterruptedException, ExecutionException {
		CollectionReference cr = FirestoreClient.getFirestore().collection( "trips" );
		ApiFuture<QuerySnapshot> querySnapshotApiFuture = cr.get();
		List<QueryDocumentSnapshot> queryDocumentSnapshots = querySnapshotApiFuture.get().getDocuments();

		for ( QueryDocumentSnapshot q : queryDocumentSnapshots )
			System.out.println( q.toString() );

		System.out.println( "call to get all trips" );

		return queryDocumentSnapshots.stream()
				.map( queryDocumentSnapshot -> queryDocumentSnapshot.toObject( Trip.class ) )
				.collect( Collectors.toList() );
	}

	public Trip getTripById( String id ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		DocumentReference documentReference = dbFirestore.collection( "trips" ).document( id );
		ApiFuture<DocumentSnapshot> future = documentReference.get();

		DocumentSnapshot document = future.get();

		Trip trip = null;

		if ( document.exists() ) {
			trip = document.toObject( Trip.class );
			return trip;
		} else
			return null;
	}

	public List<Trip> getTripsByUserId( String userId ) throws InterruptedException, ExecutionException {
		System.out.println( "get trips by user id : " + userId );
		CollectionReference cr = FirestoreClient.getFirestore().collection( "trips" );
		ApiFuture<QuerySnapshot> querySnapshotApiFuture = cr.get();
		List<QueryDocumentSnapshot> queryDocumentSnapshots = querySnapshotApiFuture.get().getDocuments();

		List<Trip> trips = queryDocumentSnapshots.stream()
				.map( queryDocumentSnapshot -> queryDocumentSnapshot.toObject( Trip.class ) )
				.filter( trip -> trip.getUserId().equals( userId ) ).toList();

		return trips;
	}

	public String deleteTripById( String id ) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection( "trips" ).document( id ).delete();

		return "Trip with ID " + id + " has been deleted.";
	}

	public String createNewTrip( Trip trip ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();

		// Add document data with auto-generated id.
		/*
		 * Map<String, Object> dataName = new HashMap<>(); dataName.put("tripName",
		 * trip.getTripName());
		 * 
		 * Map<String, List<Activity>> dataActivities = new HashMap<>();
		 * dataActivities.put("activities", trip.getActivities());
		 * 
		 * 
		 * ApiFuture<DocumentReference> addedDocRef =
		 * dbFirestore.collection("trips").add(dataActivities);
		 * ApiFuture<DocumentReference> addedDocRef2 =
		 * dbFirestore.collection("trips").add(dataName);
		 * 
		 * return "Added trip with ID: " + addedDocRef.get().getId();
		 */

		String id = UUID.randomUUID().toString().replace( "-", "" ).substring( 0, 20 );
		trip.setId( id );

		ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection( "trips" ).document( id ).set( trip );

		return id;
	}

	public String updateTripInformation( Trip trip, String id ) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();

		ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection( "trips" ).document( id ).set( trip );

		return "Trip with ID " + id + " has been updated.";
	}

	public List<Activity> getActivities( String idTrip ) throws InterruptedException, ExecutionException {
		Trip trip = getTripById( idTrip );
		return trip.getActivities();
	}

	public Activity getActivityById( String idTrip, String idActivity )
			throws InterruptedException, ExecutionException {
		Activity result = null;
		Trip trip = getTripById( idTrip );
		List<Activity> activities = trip.getActivities();
		for ( Activity a : activities )
			if ( a.getActivityId().equals( idActivity ) ) {
				result = a;
				break;
			}

		return result;
	}

	public String addNewActivity( Activity activity, String idTrip ) throws InterruptedException, ExecutionException {
		String idActivity = UUID.randomUUID().toString().replace( "-", "" ).substring( 0, 14 );
		activity.setActivityId( idActivity );

		Trip trip = getTripById( idTrip );

		List<Activity> activities = trip.getActivities();
		activities.add( activity );

		Firestore dbFirestore = FirestoreClient.getFirestore();

		List<Object> result = new ArrayList<>();
		Object data = null;
		for ( Object element : activities ) {
			data = CustomClassMapper.convertToPlainJavaTypes( element );
			result.add( data );
		}

		dbFirestore.collection( "trips" ).document( idTrip ).update( "activities", result );

		return idActivity;
	}

	public String updateActivity( Activity activity, String idTrip, String idActivity )
			throws InterruptedException, ExecutionException {
		activity.setActivityId( idActivity );
		Trip trip = getTripById( idTrip );

		List<Activity> activities = trip.getActivities();
		for ( Activity a : activities )
			if ( a.getActivityId().equals( idActivity ) ) {
				activities.remove( a );
				activities.add( activity );
				break;
			}

		Firestore dbFirestore = FirestoreClient.getFirestore();

		List<Object> result = new ArrayList<>();
		Object data = null;
		for ( Object element : activities ) {
			data = CustomClassMapper.convertToPlainJavaTypes( element );
			result.add( data );
		}

		dbFirestore.collection( "trips" ).document( idTrip ).update( "activities", result );

		return idActivity;
	}

	public String deleteActivityById( String idTrip, String idActivity )
			throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		Activity a = getTripById( idTrip ).getActivity( idActivity );
		dbFirestore.collection( "trips" ).document( idTrip ).update( "activities", FieldValue.arrayRemove( a ) );

		return idActivity;
	}

}