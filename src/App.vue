<template>
    <div id="app">
        <div
            class="m-image-padding"
            v-if="aspectRatio"
            :style="{ backgroundColor: 'red' }"
        />
        <h2>2222222222</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aspectRatio: typeof window === 'undefined' ? undefined : 2,
        };
    },
};
</script>
