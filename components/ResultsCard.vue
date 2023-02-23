<template>
    <div class="results-container" :class="winnerHouseColor">
        <span class="result">{{ result }}</span>
        <span class="total-results">{{ totalResults }}</span>
        <button v-if="!pending" 
            class="restart-button"
            @click="restartChat()"
        ><i class="icon icon-loop2"></i>
            {{ placeholders.restart }}
        </button>
    </div>
</template>

<style lang="less" scoped>
.results-container  {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 30vh;
    background-color: @darkest-navy-blue;
    &.gryffindor    {
        background-color: @red-gryffindor;
    }
    &.hufflepuff    {
        background-color: @yellow-hufflepuff;
    }
    &.ravenclaw {
        background-color: @blue-ravenclaw;
    }
    &.slytherin {
        background-color: @green-slytherin;
    }
    .restart-button {
        display: flex;
        font-size: 2rem;
        border-radius: 9999px;
        text-transform: uppercase;
        box-shadow: 5px 5px 0px 2px rgba(0,0,0,0.75);
        &:hover {
            background-color: @light-blue;
            transform: translateX(5px) translateY(5px);
            box-shadow: none;
        }
        .icon   {
            padding-right: 15px;
        }
    }
    .result {
        text-align: center;
    }
    .total-results  {
        text-align: center;
    }
}
</style>

<script lang="ts" setup>
import { Ref } from 'vue';
import Scores from '~~/utils/classes/Scores';

// load correct placeholders
const currentLocale = useLocale()
const { pending, data: placeholders } = await useAsyncData(() =>   queryContent(currentLocale.value + "/placeholders").only(["restart"]).findOne())

const result: string = await getResult()
const totalResults: string = await getTotalResults()
const totalScores: Ref<Scores> = useTotalScores()

// computed ref which returns name of class for the card color
const winnerHouseColor = computed<string>(() => totalScores.value.getWinnerHouse().toLocaleLowerCase())


</script>