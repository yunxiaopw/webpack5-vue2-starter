<template>
  <div>
    home
    <div>{{ result }}</div>
    <div>{{ result2 }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [111, 222, 333],
      result: [],
      result2: {},
    };
  },
  methods: {
    handle3d() {
      const a = ['asd', 'asdasd', 'fgdfgdfg'];
      const b = this.data.concat(a);
      this.result = b;
      const c = { a: 1, c: 2 };
      const d = { ...c, f: 'f' };
      this.result2 = d;
    },
  },
  mounted() {
    this.handle3d();
  },
};
</script>
