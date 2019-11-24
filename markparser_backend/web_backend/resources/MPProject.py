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

project_parser = reqparse.RequestParser()
project_parser.add_argument('path', type=str)
project_parser.add_argument('projectname', type=str)
project_parser.add_argument('tag', type=str)


project_json = mark_parser.project_json

def load_project():
  if not os.path.exists(project_json):  
    f =  open(project_json, 'w')        
    f.write("{}")                                                    
    f.close()                                                        
                                                                     
  with open(project_json,'r') as load_f:
    mpconfigs = json.load(load_f)
  return  mpconfigs

def write_project(js_data):
  with open(project_json, 'w+') as outfile:
    json.dump(js_data, outfile)          

def abort_if_mpproject_doesnt_exist(mpprojects, mpproject_id):
  if mpproject_id not in mpprojects:
    abort(404, message="MPProject {} doesn't exist".format(mpproject_id))


class MPProject(Resource):

  @current_window_required
  def get(self, mpproject_id):
    mpprojects = load_project()
    abort_if_mpproject_doesnt_exist(mpprojects, mpproject_id)
    return mpprojects[mpproject_id]

  @current_window_required
  def delete(self, mpproject_id):
    print(mpproject_id)
    mpprojects = load_project()
    abort_if_mpproject_doesnt_exist(mpprojects, mpproject_id)
    del mpprojects[mpproject_id]
    write_project(mpprojects)
    return '', 204

  @current_window_required
  def put(self, mpproject_id):
    mpprojects = load_project()
    args = project_parser.parse_args()
    mpproject = {'projectname': args['projectname'], 'path': args['path'], "tag": args['tag']}
    mpprojects[mpproject_id] = mpproject
    write_project(mpprojects)
    return mpproject, 201

class MPProjectList(Resource):

  @head_check
  @current_window_required
  def get(self):
    mpprojects = load_project()
    return mpprojects

  @current_window_required
  def post(self):
    print("post------ ------------------------")
    mpprojects = load_project()
    print("post------ ------------------------")
    args = project_parser.parse_args()
    print(args)

    mpproject_id = str(uuid.uuid1())

    mpprojects[mpproject_id] = {'projectname': args['projectname'], 'path': args['path'], "tag": args['tag']}
    write_project(mpprojects)
    return {mpproject_id: mpprojects[mpproject_id]}, 201

