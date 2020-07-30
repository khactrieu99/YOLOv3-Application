import model
import helper
from flask import Flask, jsonify, request
from flask import send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/pretrained', methods=['POST'])
@cross_origin()
def post_pretrained():
	image = request.files.get('image')
	image.save(secure_filename("file_upload.jpg"))

	params = {
		"names": "coco.names",
		"weight": "yolov3.weights",
		"config": "yolov3.cfg",
		"threshold": 0.5,
		"confidence": 0.5
	}
	res = model.img_detect(params)

	return jsonify({"res": res["res"]})

@app.route('/trained', methods=['POST'])
@cross_origin()
def post_trained():
	image = request.files.get('image')
	image.save(secure_filename("file_upload.jpg"))

	params = {
		"names": "obj.names",
		"weight": "yolov3-7c-5000-maxsteps_final.weights",
		"config": "yolov3-7c-5000-maxsteps.cfg",
		"threshold": 0.5,
		"confidence": 0.5
	}

	res = model.img_detect(params)

	info = helper.get_flower_info(res["obj"])
	images = helper.get_images(res["obj"])
	items = []

	for i in range(len(res["obj"])):
		items.append({
			"info": info[i],
			"image": images[i]
		})

	full_res = {
		"res": res["res"],
		"items": items
	}

	return jsonify(full_res)

if __name__ == '__main__':
	app.run(debug=False)