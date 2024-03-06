<template>
  <div>
    <article class="quote-item">
      <div class="quote-item__buttons">
        <BaseButton
          theme="success"
          v-if="canClickFavorite"
          @click="$emit('clickFavorite')"
        >
          <img
            :src="isFavorite ? '/icons/star-fill.svg' : '/icons/star.svg'"
            class="quote-item__icon"
          />
        </BaseButton>
        <BaseButton theme="fail" v-if="canDelete" @click="$emit('clickDrop')">
          <img src="/icons/delete.svg" class="quote-item__icon" />
        </BaseButton>
      </div>
      <p class="quote-item__text">{{ text }}</p>
      <div class="quote-item__footer">
        <div class="quote-item__author" @click="onClickAuthor">
          {{ author }}
        </div>
        <div class="quote-item__date">{{ date }}</div>
      </div>
    </article>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps<{
  text: string;
  author: string;
  authorSlug: string;
  date: string;
  canDelete?: boolean;
  canClickFavorite?: boolean;
  isFavorite?: boolean;
}>();

defineEmits<{
  (e: "clickFavorite"): void;
  (e: "clickDrop"): void;
}>();

const router = useRouter();

function onClickAuthor() {
  alert("Я работаю!ыы");
  router.push({
    query: {
      author: "sdas",
    },
  });
}
</script>

<style lang="sass" scoped>
.quote-item
  background: #f5f5f5
  padding: 10px 5px
  border-radius: 4px
.quote-item__text
  font-size: 15px
  line-height: 120%
  margin-bottom: 10px

.quote-item__footer
  display: flex
  align-items: center
  justify-content: space-between
.quote-item__author
  cursor: pointer
  color: gray
  &:hover
    text-decoration: underline

.quote-item__buttons
  display: flex
  justify-content: flex-end
  margin-bottom: 10px


.quote-item__icon
  width: 20px
  height: 20px
</style>
