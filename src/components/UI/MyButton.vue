
<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'my-button'
  }
</script>

<style scoped>
  button {
    width: 200px;
    padding: 10px 18px;
    margin: 10px;
    font-size: 18px;
    cursor: pointer; 
    text-transform: uppercase;
    background-color: var(--main-green);
    color: var(--white-color);
    border: 2px solid var(--main-green);
    border-radius: 5px;
  }

  button:hover {
    background-color: var(--main-green-hover);
    transition: all .4s;
  }
</style>