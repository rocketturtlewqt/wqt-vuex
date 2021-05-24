<template>
  <div id="app">
    <p>{{$store.state.msg}}</p>
    <p>{{$store.getters.add}}</p>
    <p>{{$store.state.b.c.x}}</p>
    <button @click="$store.commit('syncAddTen',10)">同步加10</button><br>
    <button @click="$store.dispatch('asyncAddTen',10)">异步加10</button><br>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

</style>
