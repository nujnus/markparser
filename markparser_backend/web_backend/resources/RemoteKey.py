from flask import Flask, request
from flask_restful import Api, Resource
from flask_restful import reqparse, abort
from mark_parser import mark_parser

from flask_cors import CORS

from flask import jsonify

import uuid
import json
import os
env_dist = os.environ 

import sys
sys.path.append("..")

from web_backend.common.util import  *

key_data = []
nokeydata = {"key": "nokey"}

class RemoteKey(Resource):

  @current_window_check
  @current_window_required
  def get(self):
    if len(key_data) > 0:
      return key_data.pop()
    else:
      return nokeydata


  def post(self):
    data = request.get_data()
    js_data = data.decode("utf-8")
    key_data.insert(0, json.loads(js_data))
    return js_data



