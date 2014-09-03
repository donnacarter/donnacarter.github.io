require 'stringex'

module DonnaCarter
  class JournalTags < Jekyll::Generator
    def generate(site)
      site.tags.keys.each do |tag|
        slug = tag.to_url
        paginate_tags(site, File.join('journal/tagged', slug), tag)
      end
    end
    def paginate_tags(site, dir, tag)
      posts = site.tags[tag]
      per_page = 5
      pages = Pager.calculate_pages posts, per_page
      (1..pages).each do |num_page|
        pager = Pager.new(site, num_page, posts, pages, per_page, dir)
        newpage = TagIndex.new(site, site.source, dir, tag, posts.length)
        newpage.pager = pager
        newpage.dir = paginate_path(newpage, site, num_page)
        site.pages << newpage
      end
    end

    def paginate_path(page, site, num_page)
      return page.url if num_page <= 1
      format = site.config['paginate_path']
      format = format.sub(':num', num_page.to_s)
      '/' + page.path.gsub(/index.html$/, '') + format
    end

    class TagIndex < Jekyll::Page
      def initialize(site, base, dir, tag, posts_count)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'journal-tags.html')
        self.data['tag'] = tag
        self.data['tag_lower'] = tag.downcase
        self.data['posts_count'] = posts_count
        # tag_title_prefix = site.config['tag_title_prefix'] || 'Posts Tagged &ldquo;'
        # tag_title_suffix = site.config['tag_title_suffix'] || '&rdquo;'
        # self.data['title'] = "#{tag_title_prefix}#{tag}#{tag_title_suffix}"
      end
    end

  end
end
