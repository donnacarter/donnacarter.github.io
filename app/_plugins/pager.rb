module DonnaCarter
  class Pager < Jekyll::Pager
    def initialize(site, page, all_posts, num_pages = nil, per_page, dir)
      @page = page
      @per_page = per_page
      @total_pages = num_pages || Pager.calculate_pages(all_posts, @per_page)

      if @page > @total_pages
        raise RuntimeError, "page number can't be greater than total pages: #{@page} > #{@total_pages}"
      end

      init = (@page - 1) * @per_page
      offset = (init + @per_page - 1) >= all_posts.size ? all_posts.size : (init + @per_page - 1)

      @total_posts = all_posts.size
      @posts = all_posts[init..offset]
      @previous_page = @page != 1 ? @page - 1 : nil
      @previous_page_path = Pager.paginate_path(site, @previous_page, dir)
      @next_page = @page != @total_pages ? @page + 1 : nil
      @next_page_path = Pager.paginate_path(site, @next_page, dir)
    end

    def self.paginate_path(site, num_page, dir)
      return nil if num_page.nil?
      dir = ensure_leading_slash(dir) + '/'
      return dir if num_page <= 1
      format = site.config['paginate_path']
      format = format.sub(':num', num_page.to_s)
      dir + format
    end
  end
end
