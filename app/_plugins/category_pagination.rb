module DonnaCarter
  class CategoryPagination < Jekyll::Generator
    def generate(site)
      if site.config['category_paginate']
        site.config['category_paginate'].each do |paginate|
          paginate_category site, paginate
        end
      end
    end

    def paginate_category(site, config)
      posts = site.categories[config['category']]
      page = template_page site, config['page']
      per_page = config['per_page'] ? config['per_page'].to_i : 10
      pages = Pager.calculate_pages posts, per_page
      (1..pages).each do |num_page|
        pager = Pager.new(site, num_page, posts, pages, per_page, page.dir)
        if num_page > 1
          newpage = Jekyll::Page.new(site, site.source, page.dir, page.name)
          newpage.pager = pager
          newpage.dir = paginate_path(page, site, num_page)
          site.pages << newpage
        else
          page.pager = pager
        end
      end
    end

    def template_page(site, path)
      site.pages.dup.find do |page|
        path == page.path
      end
    end

    def paginate_path(page, site, num_page)
      return page.url if num_page <= 1
      format = site.config['paginate_path']
      format = format.sub(':num', num_page.to_s)
      '/' + page.path.gsub(/index.html$/, '') + format
    end
  end
end
