<script lang="ts">
  import { leftDrawer } from "$lib/stores/drawer";
</script>

<div
  class="w-7 flex flex-col flex-none bg-gray-900 border-gray-400 border border-opacity-20 p-1"
>
  <button
    class="focus:outline-none"
    on:click={leftDrawer.toggle}
    aria-label="Toggle Drawer"
  >
    <i class="fas fa-home"></i>
  </button>
</div>
