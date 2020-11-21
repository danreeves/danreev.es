require "cmark"
include Cmark

OPTIONS = Option.flags(
  Unsafe,
  Smart,
  ValidateUTF8,
  GithubPreLang,
  LiberalHTMLTag,
  StrikethroughDoubleTilde
)
EXTENSIONS = Extension.flags(
  Table
)

def md_to_html(md : String)
  Cmark.document_to_html(
    md, OPTIONS, EXTENSIONS
  )
end
