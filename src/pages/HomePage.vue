<template>
  <div class="main">
    <h1 class="main-title">The random Quotes:</h1>
    <div class="main-quotes__row">
      <div class="main-quotes__column">
        <h3 class="main-quotes__title">
          <Transition>
            <div class="main-quotes__title-button" v-if="author">
              <BaseButton
                icon="/icons/left-arrow.svg"
                alt="Show random quotes"
                tooltip="Случайные заметки"
                @click="resetAuthor"
              />
            </div>
          </Transition>
          <Transition mode="out-in">
            <span class="main-quotes__title-text" :key="author">
              {{ author ? `Заметки от ${author}` : "Случайные заметки" }}:
            </span>
          </Transition>
        </h3>

        <div class="main-quotes__header">
          <BaseButton
            class="main-quotes__btn"
            icon="/icons/reload.svg"
            alt="Get new quotes"
            tooltip="Новые заметки"
            @click="fetchRandomQuotes"
          />
        </div>
        <QuoteList
          v-if="!isLoading"
          :list="quotesWithFavorite"
          can-click-favorite
          @click-favorite="onClickAddFavorite"
        />
        <div v-else>Загрузка...</div>
      </div>
      <div class="main-quotes__column">
        <h3 class="main-quotes__title">Мои заметки:</h3>
        <div class="main-quotes__header">
          <BaseButton
            class="main-quotes__btn"
            theme="fail"
            tooltip="Удалить все"
            icon="/icons/delete.svg"
            alt="delete all"
            @click="clearFavorites"
          />
        </div>
        <QuoteList :list="favorites" can-delete @click-drop="deleteFavorite" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { QuoteType } from "../types/quote.types";
import QuoteList from "../components/Quote/QuoteList.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import useFavorite from "../composebles/useFavorite";
import { useRoute, useRouter } from "vue-router";
import { BASE_URL } from "../constants/baseUrl";

const LIMIT_TO_FETCH_QUOTES = 10;

const { favorites, addFavorite, deleteFavorite, clearFavorites } =
  useFavorite();

const route = useRoute();
const router = useRouter();

const randomQuotes = ref<QuoteType[]>([]);
const isLoading = ref(false);

const author = computed(() => route.query.author as string);

const quotesWithFavorite = computed<QuoteType[]>(() => {
  return randomQuotes.value.map((item) => {
    item.isFavorite = favorites.value.some((fav) => item._id === fav._id);
    return item;
  });
});

async function fetchRandomQuotes() {
  isLoading.value = true;
  let url = `${BASE_URL}/quotes/random?limit=${LIMIT_TO_FETCH_QUOTES}`;
  if (author.value) {
    url = `${BASE_URL}/quotes/random?limit=${LIMIT_TO_FETCH_QUOTES}&author=${author.value}`;
  }

  try {
    const res = await fetch(url);

    const data: QuoteType[] = await res.json();

    randomQuotes.value = data;
  } catch (e) {
    alert("Ошибка, сервер временно не работает");
  }
  isLoading.value = false;
}

function resetAuthor() {
  router.replace({
    query: {},
  });
}

function onClickAddFavorite(quote: QuoteType) {
  if (quote.isFavorite) {
    deleteFavorite(quote);
    return;
  }
  addFavorite(quote);
}

watch(author, fetchRandomQuotes);

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
  display: flex
  align-items: center
  height: 40px
  margin-bottom: 10px

.main-quotes__title-button
    display: block
    margin-right: 5px
    &.v-enter-active,
    &.v-leave-active
        transition: 0.2s ease-in
        max-width: 50px



    &.v-enter-from,
    &.v-leave-to
        transform: translateX(-20px)
        max-width: 0
        opacity: 0
        margin-right: 0px

.main-quotes__title-text
    &.v-enter-active,
    &.v-leave-active
        transition: 0.2s ease-in
    &.v-enter-from
        transform: translateY(10px)
        opacity: 0

    &.v-leave-to
        transform: translateY(-10px)
        opacity: 0


.main-quotes__header
  display: flex
  justify-content: flex-end
  margin-bottom: 5px
</style>
