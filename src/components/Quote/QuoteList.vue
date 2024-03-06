<template>
  <div>
    <TransitionGroup name="list" tag="ol" appear class="quote-list">
      <li
        class="quote-list__column"
        v-for="(item, i) in list"
        :key="item._id"
        :style="{
          transitionDelay: `${i * 0.2}s`,
        }"
        mode="out-in"
      >
        <Quote
          :text="item.content"
          :author="item.author"
          :author-slug="item.authorSlug"
          :date="item.dateAdded"
          :is-favorite="item.isFavorite"
          :can-delete="canDelete"
          :can-click-favorite="canClickFavorite"
          @click-favorite="$emit('clickFavorite', item)"
          @click-drop="$emit('clickDrop', item)"
        />
      </li>
    </TransitionGroup>
  </div>
</template>
<script lang="ts" setup>
import { QuoteType } from "../../types/quote.types";
import Quote from "./Quote.vue";

defineProps<{
  list: QuoteType[];
  canDelete?: boolean;
  canClickFavorite?: boolean;
}>();

const emits = defineEmits<{
  (e: "clickFavorite", quote: QuoteType): void;
  (e: "clickDrop", quote: QuoteType): void;
}>();
</script>
<style lang="sass">
.quote-list
  padding: 10px
  border: 1px solid gray
.quote-list__column
  margin-bottom: 10px
  list-style: none
  padding: 0
  &.list-enter-active,
  &.list-leave-active
    transition: 0.8s cubic-bezier(1,-0.25,0,1.67)
    max-height: 500px
  &.list-enter-from,
  &.list-leave-to
    opacity: 0
    transform: translateX(-60px)
    max-height: 0
    margin-bottom: 0
</style>
