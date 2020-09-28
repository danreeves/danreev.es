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
  front, markdown = content.split(delimiter, nil, remove_empty: true)
  return {Frontmatter.from_yaml(front.strip), markdown}
end
