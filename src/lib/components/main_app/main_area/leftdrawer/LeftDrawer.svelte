<script lang="ts">
  import { leftDrawer } from "$lib/stores/drawer";
  import { graphPath } from "$lib/stores/graph";
  import DocTree from "./doc_tree/DocTree.svelte";
  import TopItems from "./TopItems.svelte";
</script>

<!-- TODO: Fix CSS for this file -->
<div class="flex-row flex flex-none">
  <!-- Left-side drawer -->
  <div
    class="bg-gray-800 text-white overflow-hidden"
    style="width: {$leftDrawer.width}px; transition: width 0.3s ease;"
  >
    <div class="h-full flex flex-col">
      <!-- Drawer header with toggle button -->
      <div class="p-1 bg-gray-700 flex justify-between items-center">
        <!-- Aligns to the left because of justify-between -->
        <p class="text-white">{$graphPath.name}</p>
        <!-- Aligns to the right because of justify-between -->
        <button
          class="focus:outline-none"
          on:click={leftDrawer.toggle}
          aria-label="Toggle Drawer"
        >
          <i
            class="fas {$leftDrawer.isExpanded
              ? 'fa-chevron-right'
              : 'fa-chevron-left'} transition-transform duration-300"
          ></i>
        </button>
      </div>
      <!-- Drawer content -->
      <TopItems></TopItems>
      <hr class="border-t border-gray-300 my-4" />
      <DocTree></DocTree>
    </div>
  </div>
  <!-- Resizer -->
  <button
    class={`w-1 h-full ${$leftDrawer.isResizing ? "bg-gray-500 cursor-ew-resize" : "bg-none"} hover:bg-gray-500 hover:cursor-ew-resize transition-colors duration-200`}
    on:mousedown={leftDrawer.startResizing}
    aria-label="Resize Navigation Drawer"
  ></button>
</div>
