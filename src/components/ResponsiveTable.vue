<template>
  <div class="table-responsive"><slot /></div>
</template>

<style lang="scss">
.table-responsive {
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
  }
}
</style>
