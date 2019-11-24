from flask import Flask, request
from flask_restful import Api, Resource
from flask_restful import reqparse, abort
from mark_parser import mark_parser

from flask_cors import CORS

import uuid
import json
import os
env_dist = os.environ 


app = Flask(__name__)



api = Api(app)
CORS(app, supports_credentials=True)


from resources.MPConfig import MPConfig
from resources.MPConfig import MPConfigList

from resources.MPCard import  MPCard

from resources.MPProject import MPProjectList
from resources.MPProject import MPProject

from resources.SavedInfo import SavedInfo
from resources.RemoteKey import RemoteKey
from resources.MarkList import MarkList
from resources.UpdateAllCommand import UpdateAllCommand
from resources.OpenFileCommand import OpenFileCommand

from resources.CurrentMPProject import CurrentMPProject
from resources.CurrentWindow import CurrentWindow


api.add_resource(MPConfigList, '/mpconfigs/<mpproject_id>')
api.add_resource(MPConfig, '/mpconfigs/<mpproject_id>/<mpconfig_id>')

api.add_resource(MPCard, '/card/<mpproject_id>/<card_id>')

api.add_resource(MPProjectList, '/mpprojects')
api.add_resource(MPProject, '/mpprojects/<mpproject_id>')

api.add_resource(SavedInfo, '/save/<mpproject_id>')

api.add_resource(RemoteKey, '/remote_key')

api.add_resource(MarkList, '/marks/<mpproject_id>')

api.add_resource(UpdateAllCommand, '/updateall/<mpproject_id>')

api.add_resource(OpenFileCommand, '/open_file/<current_window_id>')

api.add_resource(CurrentMPProject, '/current_mp_project')

api.add_resource(CurrentWindow, '/current_window_id')



if __name__ == '__main__':
    app.run(debug=True, port=5001)
