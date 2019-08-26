<script>
  export let userName;
  export let jobTitle;
  export let description;
  export let userImage;
</script>

<div style="border:1px solid black;">
  <header>
    <div class="thumb" class:thumb-placeholder={!userImage}>
      <img src={userImage} alt="" />
    </div>
    <div>
      <h1>{userName}</h1>
      <h2>{jobTitle}</h2>
    </div>
  </header>
  <div>
    <p>
      {@html description}
    </p>
  </div>
</div>
