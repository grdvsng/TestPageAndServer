from flask import Flask, render_template
from os.path import abspath
from os import chdir

app = Flask(
    __name__, 
    template_folder = abspath(".\\"),
    static_url_path = "/content", 
    static_folder   = "content"
)

@app.route("/")
@app.route("/index")
def main(name=None):
    return render_template(
    	'index.html',
    	console_gave=["123"]
	) 

app.run(host='192.168.1.36', port='8080')