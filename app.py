from flask import (
	Flask, 
	render_template, 
	url_for,
	request as flaskRequest
)
from os.path import abspath
from os import chdir

import pdb


class MainAplication:
	
	def get_domain(data):
		return data


app    = Flask(
	__name__, 
	template_folder = abspath(".\\"),
	static_url_path = "/content",
	static_folder   = "content"
)
parser = MainAplication()

@app.route("/")
@app.route("/index")
def main():
	return render_template('index.html') 

@app.route('/app/get/domain', methods=['GET'])
def get_domain():
	data = parser.get_domain(flaskRequest.url)
	print(data)

	return main();


if __name__ == '__main__':
	app.config.from_pyfile(abspath('.\\bin\\config.py'))
	app.run(host='192.168.1.36', port='8080')

