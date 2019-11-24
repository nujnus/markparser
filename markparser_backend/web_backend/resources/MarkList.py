from flask import Flask, request
from flask_restful import Api, Resource
from flask_restful import reqparse, abort
from flask import jsonify
from mark_parser import mark_parser

from flask_cors import CORS

import uuid
import json
import os
env_dist = os.environ 


import sys
sys.path.append("..")

from web_backend.common.util import  *

class MarkList(Resource):

  @current_window_required
  def get(self, mpproject_id):
    print("-------->>>>>>>>>>>>>>>>>>>>>>>>>>>")
    print("mpproject_id:", mpproject_id)
    mark_json = mark_parser.MPProject(mpproject_id).mark_json
    if not os.path.exists(mark_json):
      f =  open(mark_json, 'w')
      f.write("{}")
      f.close()
    
    with open(mark_json,'r') as load_f:
      return json.load(load_f)


