module Jekyll
  module CategoryFilter
    def first_in_category(post)
      @context.registers[:site].categories[post['categories'].first].first
    end

    def next_in_category(post)
      posts_in_category = @context.registers[:site].categories[post['categories'].first]
      pos = posts_in_category.index { |p| post['path'] == p.path }
      if pos && pos < posts_in_category.length - 1
        posts_in_category[pos + 1]
      else
        nil
      end
    end

    def next_next_in_category(post)
      posts_in_category = @context.registers[:site].categories[post['categories'].first]
      pos = posts_in_category.index { |p| post['path'] == p.path }
      if pos && pos < posts_in_category.length - 2
        posts_in_category[pos + 2]
      else
        nil
      end
    end

    def previous_in_category(post)
      posts_in_category = @context.registers[:site].categories[post['categories'].first]
      pos = posts_in_category.index { |p| post['path'] == p.path }
      if pos && pos > 0
        posts_in_category[pos - 1]
      else
        nil
      end
    end

    def previous_previous_in_category(post)
      posts_in_category = @context.registers[:site].categories[post['categories'].first]
      pos = posts_in_category.index { |p| post['path'] == p.path }
      if pos && pos > 1
        posts_in_category[pos - 2]
      else
        nil
      end
    end

    def last_in_category(post)
      @context.registers[:site].categories[post['categories'].first].last
    end
  end
end

Liquid::Template.register_filter(Jekyll::CategoryFilter)
