<div class="tournaments">
    <router-view></router-view>
</div>

<script>
const Blog = {
    template:
            '<div class="block">'+
                '<div class="block-header-wrapper">'+
                    '<h1>Tournament list</h1>'+
                '</div>'+

                '<loading v-if="loading"></loading>'+

                '<div class="block-content blog-block" v-for="post in posts">'+
                    '<div class="date" v-html="post.date"></div>'+
                    '<router-link v-bind:to="\'../article/\'+post.slug" class="image-holder" v-html="post.image"></router-link>'+
                    '<h3 :href="\'blog/\'+post.slug" class="title">{{post.title.rendered}}</h3>'+
                    '<div class="text" v-html="post.excerpt.rendered"></div>'+
                    '<router-link role="button" class="btn btn-info" v-bind:to="\'../article/\'+post.slug">Read more</router-link>'+
                '</div>'+

                '<div class="pages">'+
                    '<pagination v-bind:page="page" v-bind:amount="amount" amount-per-page="5"></pagination>'+
                '</div>'+
            '</div>',
    data: function() {
        if (!this.$route.params.page) {
            this.$route.params.page = 1;
        }

        return {
            loading: true,
            amount: 0,
            posts: {},
            page: this.$route.params.page,
        }
    },
    created: function() {
        return this.fetchData();
    },
    watch: {
        $route: 'fetchData'
    },
    methods: {
        fetchData: function() {
            var self = this;
            
            axios.all([
                axios.get('/wp/wp-json/pce-api/post-count'),
                axios.get('/wp/wp-json/wp/v2/posts/?per_page=5&page='+this.$route.params.page)
            ])
            .then(axios.spread(function (amount, posts) {
                self.amount = amount.data.publish;

                posts = posts.data;

                for (i = 0; i < posts.length; ++i) {
                    date = (new Date(posts[i].date));
                    posts[i].date = date.toLocaleString('en-us', { month: "short" })+'<br />'+date.getDate();
                }
                
                self.posts = posts;
                self.loading = false;
            }));

            this.page = this.$route.params.page;
        }
    }
}

const router = new VueRouter({
    //mode: 'history',
    routes: [
        { path: '/', component: Blog, meta: { title: 'Blog' } },
        { path: '/page/:page', component: Blog, meta: { title: 'Blog' } },
        { path: '/article/:post', component: BlogArticle, meta: { title: '' } },
    ]
})

new Vue({
  router
})
.$mount('.tournaments')
</script>