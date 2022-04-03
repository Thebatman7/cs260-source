<template>
<div id="app">

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/"><img class='logo' src="images/r-logo.png"></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!--justify-content-end moves the content to the right-->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

      <ul class="navbar-nav">
        <!--All pages start with "/", meaning the top folder of your site-->
        <!-- <li class="nav-item">
          <router-link to="/detach">
            <div class="menu-item detach">
              <i class="fas fa-puzzle-piece"></i>
              <p>Detach</p>
            </div>
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/likes">
            <div class="menu-item detach">
              <i class="fab fa-gratipay"></i>
              <p>My Likes</p>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bucket_list">
            <div class="menu-item detach">
              <i class="fas fa-th-list"></i>
              <p>My Bucket List</p>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin">
            <div class="menu-item detach">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <p>Admin</p>
            </div>
          </router-link>
        </li>
        <li class="nav-item resume">
          <a class="nav-link resume-link" href="/images/REM.pdf" target="_blank">If you liked the web click here for my Resume</a>
        </li>
      </ul>

    </div>
  </nav>

  <router-view />

  <footer id="theFooter">
    <div class='footer'>
      <div class='footer-item footer-one'>
        <a class='instagram-link' href='https://www.instagram.com/rembrand.paul/' target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <div class='footer-item footer-two'>
        <a class='linkedin-link' href='https://www.linkedin.com/in/rembrandpardo/' target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
      <div class='footer-item footer-three'>
        <a class='git-link' href='https://github.com/Thebatman7/cs260-source' target="_blank">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div class='footer-item footer-four'>
        <a class='twitter-link' href='https://twitter.com/rembrand_pardo' target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
      </div> 
      <div class='footer-item footer-five'>
        <a class='facebook-link' href='https://www.facebook.com/profile.php?id=100010131761034' target="_blank">
          <i class="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  </footer>

</div>
</template>

<style>
* {
  box-sizing: border-box;
  background-color: #0a192f;
  font-family: Iceland; font-size: 24px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 26.4px; } h3 { font-family: Iceland; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 15.4px; } p { font-family: Iceland; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 20px; } blockquote { font-family: Iceland; font-size: 21px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 30px; } pre { font-family: Iceland; font-size: 13px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 18.5714px;
}
/* Menu */
.bg-light {
  background-color: #0a192f !important;
}
.nav-link {
  color: #ccd6f6 !important;
  font-family: Iceland; font-size: 3.3vh; font-style: normal; font-variant: normal; font-weight: 400; line-height: 26.4px; } h3 { font-family: Iceland; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 15.4px; } p { font-family: Iceland; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 20px; } blockquote { font-family: Iceland; font-size: 21px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 30px; } pre { font-family: Iceland; font-size: 13px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 18.5714px;
}
.navbar {
  /* border: 1px solid #2fcf4a; */
  height: auto;
  padding: 0px 0px; /*Default top, bottom, left, and right padding was a lot. */
}
.logo {
  width: min(12vw, 200px); /*Needed to make logo responsive. Without it logo overlaps navbar.*/
}
.resume {
  padding-top: 0.35em;
}
.resume-link {
  color:rgb(27, 192, 178) !important;
  font-weight: 200 !important;
  background-color: transparent;
  border: 1px solid #12EBC9;
  color: #12EBC9;
  border-radius: 3.0px;
  line-height: 1.2;
  padding: 0.1em;
}
.resume-link:hover {
  background: #64ffdb46;
}
.nav-link:hover {
  color: rgb(27, 192, 178) !important;
}
.active {
  color: rgb(27, 192, 178) !important;
}


.menu-item p {
  font-size: 1.1em;
  color: #ccd6f6;
  margin-left: 0em;
  margin-right: 0.7em;
}

a:hover {
  text-decoration: none;
}

.fa,
.fas,
.fa-gratipay {
  color: #ccd6f6 !important;
}
.fa:hover,
.fas:hover,
.fa-gratipay:hover {
  color: #007bff !important;
}


.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}

body {
  margin: 5px 90px;
}

#theFooter {
  margin: 0;
  display: block;
}

.footer {
  /* border: 2px solid rgb(209, 65, 8); */
  display: flex;
  justify-content: space-between;
  /* position:fixed; */
  /* bottom: 0; */
  width: 100%;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
}

.footer-item {
  /* border: 2px solid rgb(4, 61, 28); */
  background-color: #0a192f;
  color: #12EBC9;
  /*That flex: 1; line tells the items to stretch to match the width of .footer.*/
  flex: 1;
  display: flex;
  justify-content: center;
  height: 0.9em;
}

.fab { 
  color: #8892b0;
  vertical-align: middle;
  font-size: 0.9em;
}
.fa:hover,
.fab:hover {
  color:rgb(27, 192, 178)
}

</style>
