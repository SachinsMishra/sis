
from flask import Flask, request, jsonify
from datetime import datetime

import time
import ptvsd
from search import Fixture,SearchFiles

app = Flask(__name__)


@app.route('/api/health', methods=['GET'])
def hello():
    data = {
        "staus": "Running...",
        "dateTime": datetime.now()
    }
    return jsonify(data)


@app.route('/api/greet/<name>', methods=['GET'])
def greet(name):
    return jsonify(message=f'Hello, {name}!')


@app.route('/api/sample_fixture', methods=['POST'])
def search_fixture():
    car_te=Fixture();
    data = request.get_json()
    first_name = data.get('firstName')
    option = data.get('option')
    option_total = 0
    if option is not None:
        for item in option:
            option_total += item
    return jsonify(message=car_te.get_name(firstName=first_name,total=option_total))

@app.route('/api/sample_keywords', methods=['POST'])
def search_keyword():
    search_keys=SearchFiles();
    data = request.get_json()
    directory = data.get('directory')
    keywords = data.get('keywords')
    if search_keys.folder_exists(directory):
        resultInfo=[];
        search_results = search_keys.get_result(directory,keywords=keywords);
        for filename, matches in search_results.items():
            elem={
                "filename":filename,
                "match":matches
            }
            resultInfo.append(elem)
        return jsonify(resultInfo)
    else:
        return jsonify({
            "message":"Path does not exits"
        })


# ptvsd.enable_attach(address=('localhost', 5000))
if __name__ == '__main__':
    app.run()

