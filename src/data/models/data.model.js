// export class PropertyDamageReport {
//   constructor(id, city, street, completed) {
//     this.id = id;
//     this.city = city;
//     this.street = street;
//     this.date = new Date().toISOString;
//     this.completed = completed;
//   }
// }

export class Damage {
  constructor(location, newDamage, damageType, date, urgentActionRequired, description, images) {
    this.location = location;
    this.newDamage = newDamage;
    this.damageType = damageType;
    this.date = date;
    this.urgentActionRequired = urgentActionRequired;
    this.description = description;
    this.images = images;
  }
}

export class MaintenanceTask {
  constructor(location, maintenanceType, urgentActionRequired, costIndication, images) {
    this.location = location;
    this.maintenanceType = maintenanceType;
    this.urgentActionRequired = urgentActionRequired;
    this.costIndication = costIndication;
    this.images = images;
  }
}

export class TechnicalInstallations {
  constructor(location, installationType, reportedIssues, testProcedure, approved, comments, images) {
    this.location = location;
    this.installationType = installationType;
    this.reportedIssues = reportedIssues;
    this.testProcedure = testProcedure;
    this.approved = approved;
    this.comments = comments;
    this.images = images;
  }
}

export class Modifications {
  constructor(documentedModifications, location, executedBy, modificationDescription, actionRequired, comments, images) {
    this.documentedModifications = documentedModifications;
    this.location = location;
    this.executedBy = executedBy;
    this.modificationDescription = modificationDescription;
    this.actionRequired = actionRequired;
    this.comments = comments;
    this.images = images;
  }
}