const LABELS = {
	damage: "Schade opnemen",
	overdueMaintenance: "Achterstallig onderhoud opnemen",
	technicalInstallation: "Technische installaties inspecteren",
	modification: "Modificaties inventariseren",
};

export const getInspectionLabel = (i) => LABELS[i.type] ?? "Onbekende inspectie";
export const hasUrgentAction = (i) => !!i.urgentActionRequired;
export const isEmptyInspection = (i) => !i?.type;
