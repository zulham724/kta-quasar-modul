<template>
  <div id="q-app">
    <platform-mobile-component v-if="$q.platform.is.mobile"></platform-mobile-component>
    <platform-desktop-component v-else></platform-desktop-component>
  </div>
</template>

<script>
export default {
  name: 'App',
   components: {
        PlatformMobileComponent: () => import('components/PlatformMobileComponent.vue'),
        PlatformDesktopComponent: () => import('components/PlatformDesktopComponent.vue')
    },
}
</script>
