require 'nokogiri'

module Jekyll
  module ExcerptFilter
    def excerpt(raw)
      # remove any liquid tags
      raw.sub! /{({|%).*?(%|})}/, ''
      doc = Nokogiri::HTML(raw)
      first_p = doc.css('p')[0]
      # @todo make this error if no paragraph
      first_p ? first_p.text.strip : ''
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExcerptFilter)
