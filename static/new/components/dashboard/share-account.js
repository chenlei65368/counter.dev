customElements.define(
    tagName(),
    class extends HTMLElement {
        draw(user, sessionless) {
            this.classList.add("headline-right");
            this.classList.add("caption");
            if (sessionless) {
                this.innerHTML = `
                    <img src="img/eye.svg" width="20" height="18" alt="Shareable" />
                    <span class="gray ml8 mr16">You are viewing ${escapeHtml(
                        user.id
                    )}'s dashboard as guest</span>
                    <a id="share-create" href="" class="caption-strong black">Exit</a>`;
            } else if (user.token) {
                let shareLink =
                    window.location.href.split("#")[0] +
                    "#" +
                    encodeURIComponent(user.id) +
                    ":" +
                    encodeURIComponent(user.token);
                this.innerHTML = `
                    <img src="img/eye.svg" width="20" height="18" alt="Shareable" />
                    <span class="gray ml8 mr16">This account has guest access</span>
                    <a data-clipboard-text="${escapeHtml(
                        shareLink
                    )}" href="#" class="mr16 caption-strong black btn-copy">Copy url</a>
                    <a href="#" class="caption-strong black" >Remove</a>`;
                this.getElementsByTagName("a")[1].onclick = () =>
                    this.post("/deletetoken");
            } else {
                this.innerHTML = `
                    <img
                      src="img/eye-slash.svg"
                      width="20"
                      height="18"
                      alt="Not shareable"
                    />
                    <span class="gray ml8 mr16">This account has no guest access</span>
                    <a href="#" class="caption-strong black" >Share</a>`;
                this.getElementsByTagName("a")[0].onclick = () =>
                    this.post("/resettoken");
            }
        }

        post(url) {
            this.innerHTML = `<span class="gray ml8 mr16 postponed-visibility">Still loading (error?)...</span>`;
            fetch(url, { method: "post" });
        }
    }
);