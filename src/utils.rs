use comrak::ComrakOptions;

pub fn comrak_options() -> ComrakOptions {
    ComrakOptions {
        ext_strikethrough: true,
        ext_header_ids: Some("".to_string()),
        ext_autolink: true,
        github_pre_lang: true,
        smart: true,
        ext_table: true,
        ..ComrakOptions::default()
    }
}
