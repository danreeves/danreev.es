require "http/client"
require "uri"
require "json"
require "cache"

module Imgur
  extend self

  CLIENT    = HTTP::Client.new(URI.parse("https://api.imgur.com"))
  CACHE     = Cache::MemoryStore(String, AlbumResponse).new(expires_in: 24.hours)
  ALBUM_IDS = [
    "g8sJzLr",
    "O9Q5gsH",
    "wfI8IBa",
    "2by7snO",
    "O4loGdV",
  ]

  class Image
    include JSON::Serializable

    property link : String
    property id : String
  end

  class Album
    include JSON::Serializable

    property title : String
    property cover : String
    property id : String
    property images : Array(Image)

    def cover_link
      cover_image = images.find do |image|
        image.id == self.cover
      end
      if cover_image
        return cover_image.link
      else
        return ""
      end
    end
  end

  class AlbumResponse
    include JSON::Serializable

    property data : Album
  end

  def get_album(album_id : String)
    CACHE.fetch(album_id) do
      response = CLIENT.get(
        "/3/album/#{album_id}",
        HTTP::Headers{"Authorization" => "Client-ID #{ENV["IMGUR_CLIENT_ID"]}"}
      )
      AlbumResponse.from_json(response.body)
    end
  end

  def get_albums
    ALBUM_IDS.map do |album_id|
      get_album(album_id).data
    end
  end
end
