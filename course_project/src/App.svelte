<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import Error from "./UI/Error.svelte";

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error;

  fetch("https://svelte-7687e.firebaseio.com/meetups.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed!");
      }
      return res.json();
    })
    .then(data => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }
      meetups.setMeetups(loadedMeetups.reverse());
      isLoading = false;
    })
    .catch(err => {
      error = err;
      console.log(err);
      isLoading = false;
    });

  let saveMeetup = event => {
    editMode = null;
    editedId = null;
  };

  let showDetails = event => {
    page = "details";
    pageData.id = event.detail;
  };

  let closeDetails = () => {
    page = "overview";
    pageData = {};
  };

  let startEdit = event => {
    editMode = "edit";
    editedId = event.detail;
  };

  let cancelEdit = () => {
    editMode = null;
    editedId = null;
  };

  let clearError = () => {
    error = null;
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}
<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = 'edit';
        }} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
