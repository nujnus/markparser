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

parser = reqparse.RequestParser()
parser.add_argument('type', type=str)
parser.add_argument('path', type=str)
parser.add_argument('tag', type=str)

def load_data(mpproject_id):
  config_json = mark_parser.MPProject(mpproject_id).config_json
  if not os.path.exists(config_json):  
    f =  open(config_json, 'w')        
    f.write("{}")                                                    
    f.close()                                                        
                                                                     
  with open(config_json,'r') as load_f:
    mpconfigs = json.load(load_f)
  return  mpconfigs

def write_data(js_data, mpproject_id):
  config_json = mark_parser.MPProject(mpproject_id).config_json
  with open(config_json, 'w+') as outfile:
    json.dump(js_data, outfile)          

def abort_if_mpconfig_doesnt_exist(mpconfigs, mpconfig_id):
    if mpconfig_id not in mpconfigs:
        abort(404, message="MPConfig {} doesn't exist".format(mpconfig_id))


class MPConfig(Resource):

  @current_window_required
  def get(self, mpconfig_id, mpproject_id):
    print(mpproject_id)
    mpconfigs = load_data(mpproject_id)
    abort_if_mpconfig_doesnt_exist(mpconfigs, mpconfig_id)
    return mpconfigs[mpconfig_id]

  @current_window_required
  def delete(self, mpconfig_id, mpproject_id):
    print(mpproject_id)
    print(mpconfig_id)
    mpconfigs = load_data(mpproject_id)
    abort_if_mpconfig_doesnt_exist(mpconfigs, mpconfig_id)
    del mpconfigs[mpconfig_id]
    write_data(mpconfigs)
    return '', 204


  @current_window_required
  def put(self, mpconfig_id, mpproject_id):
    print(mpproject_id)
    mpconfigs = load_data(mpproject_id)
    args = parser.parse_args()
    config = {'path': args['path'], "type": args['type'], "tag": args['tag']}
    mpconfigs[mpconfig_id] = config
    write_data(mpconfigs, mpproject_id)
    return config, 201


class MPConfigList(Resource):

  @current_window_required
  def get(self, mpproject_id):
    print(mpproject_id)
    mpconfigs = load_data(mpproject_id)
    return mpconfigs

  @current_window_required
  def post(self, mpproject_id):
    print(mpproject_id)
    print("post------ ------------------------")
    mpconfigs = load_data(mpproject_id)
    print("post------ ------------------------")
    args = parser.parse_args()
    config_id = str(uuid.uuid1())

    mpconfigs[config_id] = {'path': args['path'], "type": args['type'], "tag": args['tag']}
    write_data(mpconfigs, mpproject_id)
    return {config_id: mpconfigs[config_id]}, 201

