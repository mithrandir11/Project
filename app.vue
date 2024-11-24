<script setup>
import {
  Notivue,
  NotificationProgress
} from 'notivue'
</script>

<template>

  <!-- <button @click="push.success('Hello from your first notification!')">
    Push
  </button> -->

  <Notivue v-slot="item">
    <Notification :item="item"  :theme="materialTheme">
      <NotificationProgress :item="item" />
    </Notification>
  </Notivue>

  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

