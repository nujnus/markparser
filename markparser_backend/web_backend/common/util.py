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

from functools import wraps
from web_backend.resources.CurrentWindow import CurrentWindow



def head_check(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.headers.get('Authorization')
        print("auth:")
        print(auth)
        result = f(*args, **kwargs)
        return result
    return decorated_function



def current_window_check(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        c_w_id_from_request = request.headers.get('Authorization')
        c_w_id_from_server = CurrentWindow().get()["current_window_id"]

        if (c_w_id_from_request ==  c_w_id_from_server):
            result = f(*args, **kwargs)
            result["current_window_id_check"] = 1;
        else:
            result = {"current_window_id_check" : 0}
        return result
    return decorated_function


def current_window_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        container = CurrentWindow().get()
        result = f(*args, **kwargs)
        container["real_response"] = result

        return container
    return decorated_function


def middleware_test(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        return f(*args, **kwargs)
    return decorated_function

