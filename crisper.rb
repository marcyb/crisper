require 'sinatra'
require 'sinatra/content_for'
# require 'sinatra/assetpack'
require 'yaml'

class Crisper < Sinatra::Base

	set :root, File.dirname(__FILE__)

	helpers Sinatra::ContentFor
	# register Sinatra::AssetPack

	# assets do
 #    css :main, [
 #     # '/css/reset.css',
 #     '/css/*.css'
 #    ]
 #    css_compression :sass
 #    # js_compression  :jsmin
 #  end

	get '/' do
		@gherkins = YAML.load_file('./data/gherkin.yaml')
		erb :index
	end

end

if __FILE__ == $0
	Crisper.run!
end