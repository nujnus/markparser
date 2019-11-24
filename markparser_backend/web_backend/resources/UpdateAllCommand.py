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

class UpdateAllCommand(Resource):

  @current_window_required
  def get(self, mpproject_id):
    os.system("mp updateall")
    return("ok")

