<script lang="ts">
  import TopBar from "./topnav/TopBar.svelte";
  import LeftPanel from "./leftpanel/LeftPanel.svelte";
  import RightPanel from "./rightpanel/RightPanel.svelte";
  import MainArea from "./main_area/MainArea.svelte";
  import BottomBar from "./bottombar/BottomBar.svelte";
</script>

<!-- Main App -->
<div class="flex flex-col h-screen w-full">
  <TopBar />
  <div class="h-full w-full flex flex-row">
    <LeftPanel />
    <MainArea />
    <RightPanel />
  </div>
  <BottomBar />
</div>
