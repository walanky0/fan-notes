<template>
  <main class="main">
    <h1 class="main-title">The random Quotes:</h1>
    <div class="main-quotes__row">
      <div class="main-quotes__column">
        <h3 class="main-quotes__title">Случайные заметки:</h3>
        <div class="main-quotes__header">
          <BaseButton class="main-quotes__btn" @click="fetchRandomQuotes">
            <img
              src="/icons/reload.svg"
              alt="Get new quotes"
              class="main-quotes__icon"
            />
          </BaseButton>
        </div>
        <QuoteList
          :list="quotesWithFavorite"
          v-if="!isLoading"
          @click-favorite="onClickAddFavorite"
          can-click-favorite
        />
      </div>
      <div class="main-quotes__column">
        <h3 class="main-quotes__title">Мои заметки:</h3>
        <div class="main-quotes__header">
          <BaseButton
            class="main-quotes__btn"
            theme="fail"
            @click="clearFavorites"
          >
            <img
              src="/icons/delete.svg"
              alt="DeleteAll"
              class="main-quotes__icon"
            />
          </BaseButton>
        </div>
        <QuoteList :list="favorites" can-delete @click-drop="deleteFavorite" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { QuoteType } from "./types/quote.types";
import QuoteList from "./components/Quote/QuoteList.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import useFavorite from "./composebles/useFavorite";

const BASE_URL = "https://api.quotable.io";
const LIMIT_TO_FETCH_QUOTES = 10;

const { favorites, addFavorite, deleteFavorite, clearFavorites } =
  useFavorite();

const randomQuotes = ref<QuoteType[]>([]);
const isLoading = ref(false);

async function fetchRandomQuotes() {
  isLoading.value = true;
  try {
    const res = await fetch(
      `${BASE_URL}/quotes/random?limit=${LIMIT_TO_FETCH_QUOTES}`
    );

    const data: QuoteType[] = await res.json();

    randomQuotes.value = data;
  } catch (e) {
    alert("Ошибка, сервер временно не работает");
  }
  isLoading.value = false;
}

function onClickAddFavorite(quote: QuoteType) {
  if (quote.isFavorite) {
    deleteFavorite(quote);
    return;
  }
  addFavorite(quote);
}

const quotesWithFavorite = computed<QuoteType[]>(() => {
  return randomQuotes.value.map((item) => {
    item.isFavorite = favorites.value.some((fav) => item._id === fav._id);
    return item;
  });
});

onMounted(() => {
  fetchRandomQuotes();
});
</script>

<style lang="sass" scoped>
.main
  padding: 50px 10px 30px 10px
  max-width: 1200px
  margin: 0 auto

.main-title
  margin-bottom: 30px

.main-quotes__icon
  width: 20px
  height: 20px

.main-quotes__row
  display: flex
  justify-content: space-between
  gap: 20px
  flex-wrap: wrap

.main-quotes__column
  flex: 0 0 400px
  @media(max-width: 1000px)
    flex: 0 0 100%

.main-quotes__title
  margin-bottom: 10px

.main-quotes__header
  display: flex
  justify-content: flex-end
  margin-bottom: 5px
</style>
