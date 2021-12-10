package hjc.projet.ryoko.model;

import java.util.List;

import com.google.cloud.firestore.annotation.DocumentId;

import lombok.Data;

@Data
public class Trip {

	private String tripName;
	private String userId;
	private List<Activity> activities;

	@DocumentId
	private String id;

	public String getUserId() { return userId; }

	public void setUserId( String userId ) { this.userId = userId; }

	public String getId() { return id; }

	public void setId( String id ) { this.id = id; }

	public String getTripName() { return tripName; }

	public void setTripName( String tripName ) { this.tripName = tripName; }

	public List<Activity> getActivities() { return activities; }

	public void setActivities( List<Activity> activities ) { this.activities = activities; }

	public void addActivity( Activity activity ) {
		activities.add( activity );
	}

	public Activity getActivity( String idActivity ) {
		for ( Activity a : activities )
			if ( a.getActivityId().equals( idActivity ) )
				return a;
		return null;
	}
}
