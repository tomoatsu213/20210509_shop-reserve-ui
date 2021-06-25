<template>
  <font-awesome-icon
    icon="edit"
    class="fa-2x icon-edit"
    @click="changeEditBox(value)"
  />
</template>

<script>
export default {
  props: ["value"],
  methods: {
    changeEditBox(value) {
      value.hide_edit = !value.hide_edit;
    },
  },
};
</script>

<style scoped>
.icon-edit {
  color: white;
  padding: 10px;
  cursor: pointer;
}
</style>