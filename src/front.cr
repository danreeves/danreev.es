require "yaml"
require "time"

class Frontmatter
  include YAML::Serializable
  property published : Time
end

def split_frontmatter(content : String, delimiter = "---") : Tuple(Frontmatter, String)
  if content.empty?
    return {Frontmatter.from_yaml(""), ""}
  end
  parts = content.split(delimiter, remove_empty: true)
  front = parts.shift
  markdown = parts.join("")
  return {Frontmatter.from_yaml(front.strip), markdown}
end
