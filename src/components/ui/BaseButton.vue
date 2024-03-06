<template>
  <button class="base-button" :class="theme"><slot /></button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    theme?: "success" | "fail" | "info";
  }>(),
  {
    theme: "info",
  }
);
</script>
<style lang="sass">
.base-button
  position: relative
  border: none
  padding: 10px
  cursor: pointer
  background: gray
  border-radius: 8px
  transition: 0.3s
  &::before
    position: absolute
    content: ""
    top: 50%
    left: 50%
    width: 100%
    height: 100%
    transform: translate(-50%,  -50%) scale(0.5)
    border-radius: 8px
    border: 2px solid gray
    opacity: 0
    transition: 0.3s
  &:hover
    transform: scale(1.05)
    &::before
      opacity: 1
      transform: translate(-50%,  -50%) scale(1.1)
  &:active
    transform: scale(0.95)

  &.info
    background: #b8daff
    &::before
      border-color: #b8daff

  &.success
    background: #155724
    &::before
      border-color: #155724
  &.fail
    background: red
    &::before
      border-color: red
</style>
