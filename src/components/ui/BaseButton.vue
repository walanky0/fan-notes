<template>
  <button class="base-button" :class="theme">
    <span v-if="tooltip" class="base-button__tooltip">{{ tooltip }}</span>
    <slot />
    <img v-if="icon" :src="icon" :alt="alt" class="button-icon__icon" />
  </button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    theme?: "success" | "fail" | "info";
    icon?: string;
    alt?: string;
    tooltip?: string;
  }>(),
  {
    theme: "info",
  }
);
</script>
<style lang="sass" scoped>
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
    .base-button__tooltip
      opacity: 1
      transform: translate(-50%, 0)
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

.base-button__tooltip
  position: absolute
  bottom: 110%
  left: 50%
  transform: translate(-50%, -50%)
  background: #fcf581
  padding: 5px
  border-radius: 4px
  pointer-events: none
  font-size: 12px
  width: max-content
  max-width: 150px
  opacity: 0
  transition: 0.2s
  @media(max-width: 860px)
    display: none

.button-icon__icon
  width: 20px
  height: 20px
</style>
