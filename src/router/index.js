import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes = [
  {
    name: 'Standings',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'Schedule',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'FieldPlayersPenalties',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'FieldPlayersLeader',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'GoaliesLeader',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'TeamFairplay',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'TeamPowerplay',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'TeamPenaltyKilling',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'TeamAttandance',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'TeamScoringEfficiency',
    props: {
      championshipId: '2051',
      division: 'Alapszakasz'
    }
  },
  {
    name: 'Game',
    props: {
      gameId: '61309'
    }
  }
];

const routerRoutes = routes.map(route => ({
  ...route,
  path: `/${route.name}`,
  component: () => import(/* webpackChunkName: "widgets" */ `../components/widgets/${route.name}.vue`)
}));

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...routerRoutes
  ]
});

export default router;
