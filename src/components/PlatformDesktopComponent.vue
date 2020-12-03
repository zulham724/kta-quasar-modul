<template>
<div id="q-app">
    <router-view v-if="$q.platform.is.mobile" />
    <div v-else class="row justify-center" style="background-color:black;">
        <div class="col-4">
            <router-view />
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
a {
    text-decoration: none;
    color: teal;
}

.q-header {
    width: 33.3333%;
    position: fixed;
    top: 0;
    left: auto;
    right: auto;
}

.q-footer {
    width: 33.3333%;
    position: fixed;
    bottom: 0;
    left: auto;
    right: auto;
}

.q-page {
    background-color: white
}

.q-page-container {
    background-color: white
}
</style>
