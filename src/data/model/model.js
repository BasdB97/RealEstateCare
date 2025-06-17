export class Address {
	constructor(id, street, number, postalCode, city, country) {
		this.id = id;
		this.street = street;
		this.number = number;
		this.postalCode = postalCode;
		this.city = city;
		this.country = country;
	}
}

export class Inspection {
	constructor(id, addressId, report) {
		this.id = id;
		this.addressId = addressId;
		this.report = report;
	}
}

export class DamageReport {
	constructor(
		id,
		location,
		new_damage,
		damageType,
		date,
		urgentActionRequired,
		description,
		photos
	) {
		this.id = id;
		this.location = location;
		this.new_damage = new_damage;
		this.damageType = damageType;
		this.date = date;
		this.urgentActionRequired = urgentActionRequired;
		this.description = description;
		this.photos = photos;
	}
}

export class OverdueMaintenance {
	constructor(id, location, maintenanceType, urgentActionRequired, costIndication, photos) {
		this.id = id;
		this.location = location;
		this.maintenanceType = maintenanceType;
		this.urgentActionRequired = urgentActionRequired;
		this.costIndication = costIndication;
		this.photos = photos;
	}
}

export class TechnicalInstallation {
	constructor(
		id,
		location,
		installationType,
		reportedMalfunction,
		testProcedure,
		approved,
		comments,
		photos
	) {
		this.id = id;
		this.location = location;
		this.installationType = installationType;
		this.reportedMalfunction = reportedMalfunction;
		this.testProcedure = testProcedure;
		this.approved = approved;
		this.comments = comments;
		this.photos = photos;
	}
}
export class Modification {
	constructor(
		id,
		location,
		executedBy,
		modificationDescription,
		actionRequired,
		comments,
		photos
	) {
		this.id = id;
		this.location = location;
		this.executedBy = executedBy;
		this.modificationDescription = modificationDescription;
		this.actionRequired = actionRequired;
		this.comments = comments;
		this.photos = photos;
	}
}
