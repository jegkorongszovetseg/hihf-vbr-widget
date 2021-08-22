<template>
  <div class="wrapper">
    <div class="column">
      <div class="form-control">
        <label for="seasons">Évad:</label>
        <select v-model="selectedSeasonIdInt" name="seasons" id="seasons">
          <option v-for="season in Seasons" :key="season.id" :value="season.id">{{ season.seasonName }}</option>
        </select>
      </div>
      <div class="form-control">
        <label for="championship">Bajnokság:</label>
        <select v-model="selectedChampionshipIdInt" name="championship" id="championship">
          <option
            v-for="championship in championshipData"
            :key="championship.championshipId"
            :value="championship.championshipId"
          >
            {{ championship.championshipName }}
          </option>
        </select>
      </div>
    </div>
    <div class="column">
      <div class="form-control">
        <label>Szezon azonosító (seasonId):</label>
        {{ selectedSeasonId }}
      </div>
      <div class="form-control">
        <label>Bajnokság azonosító (championship-id):</label>
        {{ selectedChampionshipIdInt }}
      </div>
      <div class="form-control">
        <label>Elérhető szakaszok (division):</label>
        <ul>
          <li v-for="section in Sections" :key="section">{{ section }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchVBRData } from '../services/http-sevices';
export default {
  name: 'GetIdes',

  data() {
    return {
      Seasons: [],
      selectedSeasonId: null,
      championshipData: [],
      selectedChampionshipId: null,
      Sections: [],
      error: '',
      apiKey: process.env.VUE_APP_VBR_API_KEY
    };
  },

  computed: {
    selectedSeasonIdInt: {
      get() {
        return this.selectedSeasonId;
      },
      set(value) {
        this.selectedSeasonId = value;
        this.getChampionshipData();
      }
    },

    selectedChampionshipIdInt: {
      get() {
        return this.selectedChampionshipId;
      },
      set(value) {
        this.selectedChampionshipId = value;
        this.getChampionshipSections();
      }
    }
  },

  mounted() {
    this.getSeasonsData();
  },

  methods: {
    async getSeasonsData() {
      try {
        const response = await fetchVBRData('v1/all-season-list', this.apiKey, {});
        this.Seasons = response;
        this.selectedSeasonId = response[0].id;
        this.getChampionshipData();
      } catch (error) {
        this.error = error.message;
      }
    },

    async getChampionshipData() {
      try {
        const response = await fetchVBRData('v1/championship-list', this.apiKey, {
          seasonId: this.selectedSeasonId
        });
        this.selectedChampionshipId = response[0].championshipId;
        this.championshipData = response;
        this.getChampionshipSections();
      } catch (error) {
        this.error = error.message;
      }
    },

    async getChampionshipSections() {
      try {
        const response = await fetchVBRData('v1/championshipSections', this.apiKey, {
          championshipId: this.selectedChampionshipId
        });
        this.Sections = response.sectionName;
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  padding: 15px;
  background-color: lightgray;
  border: 1px solid gray;
  border-radius: 5px;
}

.column {
  padding: 0 10px;
}

.form-control {
  padding: 5px 0;
}

label {
  display: block;
  padding-bottom: 3px;
  font-weight: 700;
}
</style>
