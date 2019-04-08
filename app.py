from flask import (
	Flask, 
	render_template, 
	request as flaskRequest
)

from os.path import abspath
from os import chdir

app = Flask(
	__name__, 
	template_folder = abspath(".\\"),
	static_url_path = "/content",
	static_folder   = "content"
)

app.config.from_pyfile(abspath('.\\bin\\config.py'))

@app.route("/")
@app.route("/index")
def main(name=None):
    return render_template('index.html') 

@app.route('/app/get/domain', methods=['GET', 'POST'])
def get_domain():
    print(flaskRequest.form['domain'])
    return main()

if __name__ == '__main__':
	app.run(host='192.168.1.36', port='8080')