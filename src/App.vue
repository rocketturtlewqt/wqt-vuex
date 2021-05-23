<template>
  <div id="app">
    <p>{{$store.state.msg}}</p>
    <button @click="$store.state.msg='hi'">点击</button>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

</style>
