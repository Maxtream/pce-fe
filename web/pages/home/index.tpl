<div class="home">
    
    <div class="block blog-home-page">
        <div class="block-header-wrapper">
            <h1>Latest blogs</h1>
        </div>

        <div class="block-content">
            <loading v-if="loading"></loading>
            <div class="small-blog-block" v-for="post in posts" v-if="!loading">
                <a v-bind:href="'../blog/#/article/'+post.slug" class="blog-link-wrapper">
                    <div class="image-holder">
                        <span v-if="post.image" v-html="post.image"></span>
                        <p v-else>No image</p>
                    </div>
                    <h4 class="title">{{post.title.rendered}}</h4>
                    <div class="dates" v-html="post.date"></div>
                </a>
            </div>
        </div>
    </div>
</div>

<script>
new Vue({
    el: '.blog-home-page',
    data: {
        posts: {},
        loading: false
    },
    created: function() {
        var self = this;

        this.loading = true;

        axios.get('/wp/wp-json/wp/v2/posts/?per_page=3')
        .then(function (response) {
            self.posts = response.data;

            for (i = 0; i < self.posts.length; ++i) {
                date = (new Date(self.posts[i].date));
                self.posts[i].date = date.toLocaleString('en-us', { month: "short" })+'<br />'+date.getDate();
            }

            self.loading = false;
        });
    }
});
</script>