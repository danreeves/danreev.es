require "watch"

Watch.watch "./**/*.{cr,md}", "crystal src/server.cr", opts: [:verbose, :log_changes, :on_start]

Watch.run
