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

class MPCard(Resource):

  @current_window_required
  def get(self, card_id, mpproject_id):
    print("--------")
    print(request.method) 
    print("--------")
    print(mpproject_id)

    save_json = mark_parser.MPProject(mpproject_id).save_json
    with open(save_json,'r') as load_f:
      data = json.load(load_f)["cards"][card_id]
      print(data)
    for item in data:
      item["value"] = mark_parser.__get_content__(item["filename"], item["mark_id"])
      print(item["value"])

    return data

