<template>
  <div>
    <h2>Uitgevoerde inspecties</h2>
    <ul>
      <li v-for="inspection in sortedInspections" :key="inspection.id">
        <h3>{{ inspection.city ? inspection.city + ', ' + inspection.address : 'Onbekend adres' }}</h3>
        <p>Afgerond: {{ inspection.completed ? 'Ja' : 'Nee' }}</p>
        <p>Datum: {{ formatDate(inspection.report[0].damage.date) }}</p>
        <p>Details: {{ inspection.report[0].damage.description }}</p>
        <!-- Voeg hier extra details toe voor andere inspecties als dat nodig is -->
      </li>
    </ul>
  </div>
</template>

<script>
import InspectionService from '@/services/InspectionService';

export default {
  data() {
    return {
      inspections: [],
    };
  },
  computed: {
    sortedInspections() {
      return this.inspections.slice().sort((a, b) => {
        return new Date(b.report[0].damage.date) - new Date(a.report[0].damage.date);
      });
    },
  },
  async mounted() {
    try {
      this.inspections = await InspectionService.fetchInspections();
    } catch (error) {
      // Behandel eventuele fouten bij het ophalen van gegevens
      console.error('Fout bij het ophalen van inspectiegegevens in de component:', error);
    }
  },
};
</script>
