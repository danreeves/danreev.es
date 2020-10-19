def slugify(str : String)
  str.downcase.gsub(/\s/, "-").gsub(/[^A-Za-z0-9-]/, "")
end
