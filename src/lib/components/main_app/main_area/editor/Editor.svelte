<script lang="ts">
  import Tab from "./tab/Tab.svelte";
  import TabPane from "./tabpane/TabPane.svelte";
</script>

<div class="h-full flex flex-grow min-w-0 overflow-auto">
  <TabPane></TabPane>
  <Tab></Tab>
</div>
