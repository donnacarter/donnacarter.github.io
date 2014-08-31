require 'stringex'

module Jekyll
  module SlugFilter
    def slug(raw)
      raw.to_url
    end
  end
end

Liquid::Template.register_filter(Jekyll::SlugFilter)
