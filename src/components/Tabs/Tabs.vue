<template>
  <div>
    <ul class="tabs">
      <li class="tab">XXXX</li>
      <li v-for="option in tabsOptions" :key="option" @click="onClick(option)" class="tab">
        {{ option }}
      </li>
    </ul>
    <!-- <FunctionalTransitionGroup :tab-key="currentValue">
      <slot></slot>
    </FunctionalTransitionGroup> -->
    <GroupTransition class="tab-content" :tab-key="currentValue">
      <slot />
    </GroupTransition>
  </div>
</template>

<script>
// import FunctionalTransitionGroup from './FunctionalTransitionGroup';
import GroupTransition from './GroupTransition';

export default {
  name: 'Tabs',

  components: {
    // FunctionalTransitionGroup,
    GroupTransition
  },

  props: {
    value: {
      type: String
    }
  },

  provide() {
    return {
      api: this.api
    };
  },

  data() {
    return {
      tabsOptions: [],
      currentValue: null,
      panes: [],
      api: {
        register: this.register,
        unregister: this.unregister,
        getValue: this.getValue
      }
    };
  },

  created() {
    console.log('this.$children:', this.$children);
    // this.panes = this.$children;
  },

  methods: {
    getValue() {
      // console.log("getValue:", this.value, this.currentValue);
      let option = this.value || this.currentValue;
      if (!option) {
        option = this.tabsOptions[0];
        this.currentValue = option;
        this.$emit('input', option);
      }
      return option;
    },
    register(item) {
      this.tabsOptions.push(item);
      // this.panes = this.getPanes();
    },
    unregister(item) {
      const index = this.tabsOptions.indexOf(item);
      this.tabsOptions.splice(index, 1);
    },
    onClick(option) {
      this.currentValue = option;
      this.$emit('input', option);
    }
  }
};
</script>

<style lang="scss">
.tabs-nav {
  display: flex;
}
.tabs {
  display: flex;
  width: 100%;
  list-style: none;
  border-bottom: 1px solid #e1e1e1;

  .tab {
    padding: 10px;
    border: 1px solid #e1e1e1;
    background-color: #f2f2f2;
    cursor: pointer;
    margin-bottom: -1px;

    &--current {
      background-color: #fff;
      cursor: default;
      border-bottom-color: #fff;
    }

    .icon {
      margin-right: 10px;
    }
  }
}
.tab-content {
  position: relative;
}
.tab-pane {
  background-color: aqua;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
