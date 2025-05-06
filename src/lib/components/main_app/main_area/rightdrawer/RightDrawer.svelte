<script lang="ts">
  import { rightDrawer } from "$lib/stores/drawer";
</script>

<!-- TODO: Fix CSS for this file -->
<div class="flex-row flex flex-none">
  <!-- Resizer -->
  <button
    class={`w-1 h-full ${$rightDrawer.isResizing ? "bg-gray-500 cursor-ew-resize" : "bg-none"} hover:bg-gray-500 hover:cursor-ew-resize transition-colors duration-200`}
    on:mousedown={rightDrawer.startResizing}
    aria-label="Resize Navigation Drawer"
  ></button>
  <!-- Right-side drawer -->
  <div
    class="bg-gray-800 text-white overflow-hidden"
    style="width: {$rightDrawer.width}px; transition: width 0.3s ease;"
  >
    <div class="h-full flex flex-col">
      <!-- Drawer header with toggle button -->
      <div class="p-1 bg-gray-700 flex justify-between items-center">
        <!-- Aligns to the right because of justify-between -->
        <button
          class="focus:outline-none"
          on:click={rightDrawer.toggle}
          aria-label="Toggle Drawer"
        >
          <i
            class="fas {$rightDrawer.isExpanded
              ? 'fa-chevron-left'
              : 'fa-chevron-right'} transition-transform duration-300"
          ></i>
        </button>
        <!-- Aligns to the left because of justify-between -->
        <p class="text-white">Test</p>
      </div>
      <!-- Drawer content -->
      <hr class="border-t border-gray-300 my-4" />
    </div>
  </div>
</div>

<style>
  /* Tailwind utilities can handle most styles; include custom styling if needed */
  .resizer {
    cursor: ew-resize;
    width: 4px;
    transition: background-color 0.2s;
  }

  .resizer:hover {
    background-color: #4b5563; /* Tailwind gray-600 */
    cursor: ew-resize;
  }
</style>
