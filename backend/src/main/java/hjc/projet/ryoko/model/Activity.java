package hjc.projet.ryoko.model;

import lombok.Data;

@Data
public class Activity {

	private String dateTime;
	private String activityName;
	private String type;
	private String placeID;
	private String activityID;

	public Activity( String dateTime, String activityName, String type, String placeID ) {
		this.dateTime = dateTime;
		this.activityName = activityName;
		this.type = type;
	}

	public Activity() {

	}

	public String getDateTime() { return dateTime; }

	public void setDateTime( String dateTime ) { this.dateTime = dateTime; }

	public String getActivityName() { return activityName; }

	public void setActivityName( String activityName ) { this.activityName = activityName; }

	public String getType() { return type; }

	public void setType( String type ) { this.type = type; }

	public String getPlaceId() { return placeID; }

	public void setPlaceId( String placeID ) { this.placeID = placeID; }

	public String getActivityId() { return activityID; }

	public void setActivityId( String activityID ) { this.activityID = activityID; }

}
