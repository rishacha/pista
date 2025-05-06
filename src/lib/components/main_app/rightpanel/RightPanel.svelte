<script lang="ts">
  import { rightDrawer } from "$lib/stores/drawer";

</script>
<div
  class="h-full ml-auto w-6 bg-gray-900 border-gray-400 border border-opacity-45"
>
<button
    class="focus:outline-none"
    on:click={rightDrawer.toggle}
    aria-label="Toggle Drawer"
  >
    <i class="fas fa-home"></i>
  </button>
</div>
