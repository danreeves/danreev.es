export function getPreferredLang(request: Request) {
	let [preferredLang] = request.headers.get("accept-language")?.split(",") ??
		[];
	if (preferredLang.includes(";")) {
		[preferredLang] = preferredLang.split(";");
	}
	return preferredLang;
}
