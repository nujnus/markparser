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


current_project_parser = reqparse.RequestParser()
current_project_parser.add_argument('path', type=str)
current_project_parser.add_argument('projectname', type=str)
current_project_parser.add_argument('tag', type=str)


global_current_mpprojects = ""
class CurrentMPProject(Resource):
  @current_window_required
  def get(self):
    return {"current_mpproject_id": global_current_mpprojects}

  @current_window_required
  def put(self):
    args = current_project_parser.parse_args()
    global_current_mpprojects = args['current_mpproject_id']
    return {"current_mpproject_id": global_current_mpprojects}, 201


