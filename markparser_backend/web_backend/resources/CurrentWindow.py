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
from web_backend.common.global_var import  *


current_window_parser = reqparse.RequestParser()
current_window_parser.add_argument('path', type=str)
current_window_parser.add_argument('projectname', type=str)
current_window_parser.add_argument('tag', type=str)
current_window_parser.add_argument('current_window_id', type=str)




class CurrentWindow(Resource):

  def get(self):
    return {'current_window_id': get_global_current_window_id()}

  def put(self):
    args = current_window_parser.parse_args()
    set_global_current_window_id(args['current_window_id'])

    return {'current_window_id': get_global_current_window_id()}, 201


