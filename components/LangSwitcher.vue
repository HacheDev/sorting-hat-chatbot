<template>
    <div class="dropdown-container">
        <button class="dropdown-button icon icon-circle-down">
            {{ currentLocale }}
        </button>
        <div class="dropdown-lang-content">
            <a
                class="dropdown-link"
                v-for="locale in availableLocales"
                :key="locale.toString()"
                :href="locale"
            >{{ locale }}
            </a>
        </div>
    </div>
</template>

<style lang="less" scoped>
.dropdown-container {
    position: absolute;
    display: inline-block;
    right: 5vw;
    &:hover {
        background-color: #ddd;
        .dropdown-lang-content  {
            display: block;
        }
        .dropdown-button    {
            background-color: @submit-color;
        }
    }
    .dropdown-button    {
        display: flex;
        align-items: center;
        background-color: @submit-color;
        color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
        font-size: 2rem;
        &.icon::before   {
            font-size: 3rem;
        }
    }
    .dropdown-lang-content  {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 2;
        &:hover {
            background-color: #ddd;
        }
        .dropdown-link  {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            font-size: 2rem;
            text-transform: none;
        }
    }
}
</style>

<script lang="ts" setup>
// load current and available locales
const currentLocale = useLocale()
const { locales } = useI18n()

// compute all locales except current locale
const availableLocales = computed(() => {  return (locales.value).filter(i => i !== currentLocale.value)})
</script>