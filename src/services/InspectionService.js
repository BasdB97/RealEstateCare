// InspectionService.js

export default {
  async fetchInspections() {
    try {
      const response = await fetch('http://localhost:3000/reports');
      if (!response.ok) {
        throw new Error('Netwerkfout - Gegevens kunnen niet worden opgehaald');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fout bij het ophalen van inspectiegegevens:', error);
      throw error;
    }
  },
};