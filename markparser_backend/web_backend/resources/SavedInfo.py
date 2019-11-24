from flask import Flask, request
from flask_restful import Api, Resource
from flask_restful import reqparse, abort
from mark_parser import mark_parser

from flask_cors import CORS

import uuid
import json
import os
env_dist = os.environ 


import sys
sys.path.append("..")

from web_backend.common.util import  *


class SavedInfo(Resource):

    @middleware_test
    @current_window_required
    def get(self, mpproject_id):
      print("fix for test:", mpproject_id)
      print("get save:", mpproject_id)
      save_json = mark_parser.MPProject(mpproject_id).save_json
      if not os.path.exists(save_json):
        f =  open(save_json, 'w')
        f.write("{}")
        f.close()
      with open(save_json, 'r') as loadfile:
        return json.load(loadfile)

    @current_window_required
    def post(self, mpproject_id):
      print("save:", mpproject_id)
      save_json = mark_parser.MPProject(mpproject_id).save_json
      data = request.get_data()
      print(data)

      js_data = json.loads(data.decode("utf-8"))
      print("js_data:")
      print(js_data)

      if not os.path.exists(save_json):
        f =  open(save_json, 'w')
        f.write("{}")
        f.close()

      with open(save_json, 'w+') as outfile:
        json.dump(js_data, outfile)          

      return {}, 201

