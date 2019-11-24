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


class OpenFileCommand(Resource):

  @current_window_required
  def post(self, current_window_id):
    print("post happened\n")
    data = request.get_data()
    data = json.loads(data.decode("utf-8"))
    os.system("osascript /Users/sunjun/Desktop/dotemacs/emacs_with_line.scpt " + data['filename'] + " " + str(data['linenumber']))

    print(data)
    return("ok")

