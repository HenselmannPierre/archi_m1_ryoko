package hjc.projet.ryoko.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hjc.projet.ryoko.model.Activity;
import hjc.projet.ryoko.model.Trip;
import hjc.projet.ryoko.model.User;
import hjc.projet.ryoko.service.FirebaseService;

@CrossOrigin( origins = "http://localhost:3000" )
@RestController
@RequestMapping( "/api" )
public class UserController { // RestDemoController

	@Autowired
	FirebaseService firebaseService;

	@GetMapping( "/getUserDetails" ) // endpoint
	public User getUser( @RequestHeader( ) String name ) throws InterruptedException, ExecutionException { // getExample
		return firebaseService.getUserDetails( name );
	}

	@PostMapping( "/createUser" )
	public String createNewUser( @RequestBody User user ) throws InterruptedException, ExecutionException { // @RequestHeader
																											// String
																											// name,
																											// @RequestHeader
																											// String
																											// age,
																											// @RequestHeader
																											// String
																											// location
		// return "Created new User " + user.getName(); // return user; return new
		// User(name, age, location);
		return firebaseService.saveUserDetails( user );
	}

	@PutMapping( "/updateUser" )
	public String updateUser( @RequestBody User user ) throws InterruptedException, ExecutionException { // acceder a
																											// Body ->
																											// Raw ->
																											// ObjetJson
																											// dans
																											// Postman
		return firebaseService.updateUserDetails( user );
	}

	@DeleteMapping( "/deleteUser" )
	public String deleteUser( @RequestHeader String name ) {
		return firebaseService.deleteUser( name );
	}

	@GetMapping( "/trips" )
	public List<Trip> getTrips() throws InterruptedException, ExecutionException {
		System.out.println( "eef" );
		return firebaseService.getTrips();
	}

	@GetMapping( "/trips/{id}" )
	public Trip getTripById( @PathVariable String id ) throws InterruptedException, ExecutionException {
		return firebaseService.getTripById( id );
	}
	
	@GetMapping( "{userId}/trips" )
    public List<Trip> getTripsByUserId(@PathVariable String userId) throws InterruptedException, ExecutionException {
        return firebaseService.getTripsByUserId(userId);
    }

	@DeleteMapping( "/deleteTrip/{id}" )
	public String deleteTripById( @PathVariable String id ) {
		return firebaseService.deleteTripById( id );
	}

	@PostMapping( "/createTrip" )
	public String createNewTrip( @RequestBody Trip trip ) throws InterruptedException, ExecutionException {
		return firebaseService.createNewTrip( trip );
	}

	@PutMapping( "/updateTrip/{id}" )
	public String updateTrip( @RequestBody Trip trip, @PathVariable String id )
			throws InterruptedException, ExecutionException {
		return firebaseService.updateTripInformation( trip, id );
	}

	@GetMapping( "/trips/{idTrip}/activities" )
	public List<Activity> getActivities( @PathVariable String idTrip ) throws InterruptedException, ExecutionException {
		return firebaseService.getActivities( idTrip );
	}

	@GetMapping( "/trips/{idTrip}/activities/{idActivity}" )
	public Activity getActivityById( @PathVariable String idTrip, @PathVariable String idActivity )
			throws InterruptedException, ExecutionException {
		return firebaseService.getActivityById( idTrip, idActivity );
	}

	@PostMapping( "/trips/{idTrip}/addActivity" )
	public String createNewTrip( @RequestBody Activity activity, @PathVariable String idTrip )
			throws InterruptedException, ExecutionException {
		return firebaseService.addNewActivity( activity, idTrip );
	}

	@PutMapping( "/updateActivity/{idTrip}/activities/{idActivity}" )
	public String updateActivity( @RequestBody Activity activity, @PathVariable String idTrip,
			@PathVariable String idActivity ) throws InterruptedException, ExecutionException {
		System.out.println( "called update activity" );
		return firebaseService.updateActivity( activity, idTrip, idActivity );
	}

	@DeleteMapping( "/deleteActivity/{idTrip}/activities/{idActivity}" )
	public String deleteActivityById( @PathVariable String idTrip, @PathVariable String idActivity )
			throws InterruptedException, ExecutionException {
		return firebaseService.deleteActivityById( idTrip, idActivity );
	}

}