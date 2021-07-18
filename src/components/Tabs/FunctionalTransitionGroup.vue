<script>
export default {
  props: {
    tabKey: {
      type: String
    }
  },
  render(h) {
    return h(
      'transition-group',
      {
        class: { content: true },
        props: { name: 'fade', tag: 'div', mode: 'out-in', css: false },
        on: { enter: this.enter }
      },
      this.$slots.default.map((node, index) => {
        // console.log(this.tabKey, node.componentOptions.propsData.name);
        return h(
          'div',
          {
            key: `${node.tag}-${index}`,
            style: { display: this.tabKey === node.componentOptions.propsData.name ? 'block' : 'none' }
          },
          [node]
        );
      })
    );
  },

  beforeUpdate() {
    // console.log(this.$slots.default);
    // this.$slots.default = this.$slots.default.map((node, index) => {
    //   node.key = `${node.tag}-${index}`;
    //   return node;
    // });
  },

  methods: {
    enter() {
      console.log('enter');
    }
  }
};
</script>
